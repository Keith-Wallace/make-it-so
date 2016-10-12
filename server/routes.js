var db = require('./db/index.js');
var router = require('express').Router();
var mysql = require('mysql');

//Connect collections methods to their corresponding routes
var Projects = require ('./collections/projects.js')
var Pledges = require ('./collections/pledges.js')
var Users = require ('./collections/users.js')
var Keywords = require ('./collections/keywords.js')

//twitter

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'HZvyY8LukfKyHautwZURhnfzV',
  consumer_secret: 'mD5pgI2ViOmLHGKWNnzQ7KerUypZHzH6d4k196npCNSZNEitHS',
  access_token_key: '773734795457269760-x9nikKiJB05r7HvfSTHHpi39rVy6Oex',
  access_token_secret: 'zGuJGNBRMfLxfPBW4rGhCMOWWUjYVe7BSuFyxVC52OWj7'
});

/*
  returns an array of all the projects after attaching an amount to each project
*/
router.get('/projects', function (req, res) {
  Projects.fetch()
    .then(function(projects) {
      var ret = projects.models;
      //this recurse function is basically a for loop
      //but that waits for the promises to finish before
      //starting a new iteration of the loop
      var recurse = function(i){
        // console.log(projects.models[i])
        db.knex('Pledges').where({
          "project_id":projects.models[i].id          
        }).select("amount").then(function (amounts) {
          if(amounts.length !== 0) {
            var total = 0;
            for (var q in amounts){
              total += amounts[q].amount;
            }
            ret[i].attributes.amount = total
          }

          //this is the for loop functionality
          if (++i < ret.length){
            recurse(i);
          } else {
            // console.log("succesful projects get:", ret);
            res.send(ret)
          }
        })
      }
      recurse(0);
    })

  });

// TOP BOUNTY ===========================================================================
router.get('/top-bounties', function(request, response) {
  var sqlSyntax = 'SELECT Projects.id, Projects.name, Pledges.total FROM Projects JOIN (SELECT SUM(Pledges.amount) AS total, Pledges.project_id FROM Pledges GROUP BY Pledges.project_id) Pledges ON Pledges.project_id = Projects.id ORDER BY total DESC LIMIT 5';

  db.knex.raw(sqlSyntax)
  .then(function(rows) {
    response.send(rows);
  });

});

/*
  return an array of all the users
*/
router.get('/users', function (req, res) {
  Users.fetch()
    .then(function(users) {
      console.log("succesful users get:", user.models);
      res.send(users.models)
    });
});

/*
  returns an array of all the keywords

  Unused function, did not implement keywords.
*/
router.get('/keywords', function (req, res) {
  Keywords.fetch()
    .then(function(keywords) {
      console.log("succesful keywords get:", keywords.models);
      res.send(keywords.models)
    });
});

/*
{
  username:[string],
  projectName:[string],
  timeConstraint:[string],
  wanted:[string],
  description:[string],
  pledge:[string]
}
  Creates a new project and an intial pledge associated with it
  Doesn't send back the id of the project, it instead sends back the id of the newly created pledge
*/

router.post('/project', function (req, res) {
  Projects.create({
    name: req.body.projectName,
    timeConstraint: req.body.timeConstraint,
    wanted: req.body.wanted,
    description: req.body.description
  }).then(function(project_attributes){
    db.knex('Users').where({
      "username": req.body.username
    }).select('id').then(function(data){

      //console.log('*****DATA!',data)
      var amount = JSON.parse(req.body.pledge);

      //if user exists, create a pledges, otherwise create a user then the pledge
      if (data[0] !== undefined){
       // console.log("$$$succesful post to projects:", project_attributes);

        //project id, user id, amount, res
        _createPledge(project_attributes.id, data[0].id, amount, res)
        
      } else {
        db.knex('Users').insert({
          "username": req.body.username
        }).then(function(user_id){
         console.log("$$succesful post to projects:", project_attributes);

          //project id, user id, amount, res
          _createPledge(project_attributes.id, user_id, amount, res)
        });
      }
    })
    .then(function() {
      client.post('statuses/update', { status: "Checkout our new bounty " + req.body.projectName + " submitted by user " + req.body.username + " And remember - stay SHADY!" }, function(error, tweet, response) {
          if(error) throw error;
        });
    });
  });
});

/*
{
  username:[string]
}

  Creates a new user in the database
*/
router.post('/users', function (req, res) {
  db.knex('Users').insert({
    // "email": req.body.email,
    "username": req.body.username
  }).then(function(data){
   // console.log("succesful post to users", data);
    res.send(req.body);
  })
});

/*
{
  word:[string]
}
  Creates a new keyword in the database
  Unused function, did not implement keywords before completion.
*/
router.post('/keywords', function (req, res) {
  db.knex('Keywords').insert({
    "word":req.body.word
  }).then(function(data){
    console.log("succesful post to keywords:", data);
    res.send(req.body); 
  })
});

/*
{
  project_id: [int],
  username:[string],
  amount:[int]
}
  Creates a new pledge in the database
  This function is really only used for testing purposes when posting to pledges
*/
router.post('/pledges', function (req, res) {
  db.knex('Users').where({
    "username": req.body.username
  }).select('id').then(function(data){
    var user_id;
    // if the user exists, create pledge, other wise create user then create pledge
    if (data.length !== 0){
      _createPledge(req.body.project_id, data[0].id, req.body.amount, res)
    } else {
      db.knex('Users').insert({
        "username": req.body.username
      }).then(function(user_id){
        _createPledge(req.body.project_id, user_id, req.body.amount, res);
        console.log("succesful post to pledges")
      })
    }
  })
});

/*
  internal function used by post to pledges and to users.
*/
var _createPledge = function(project_id, user_id, amount, res){
  db.knex('Pledges').insert({
    "project_id": project_id,
    "user_id": user_id,
    "amount": amount
  }).then(function(pledgeId){
    console.log(pledgeId);
    res.send(pledgeId); 
  })
}

/*
  currently functionality simply deletes claimed projects instead of storing them anywhere useful
*/
router.delete('/project/:projectId', function (req, res) {
	db.knex('Projects')
  .where({
   "id": req.params.projectId 
  })
  .del()
  .then(function(x) {
    res.end();
  });
});

module.exports = router;

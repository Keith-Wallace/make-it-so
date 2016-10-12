var db = require('../db/index.js');
var User = require('./user.js');
var Project = require('./project.js');


var Pledge = db.Model.extend({
  tableName: 'Pledges',
  user_id: function(){
    return this.belongsTo(User, 'user_id');
  },
  project_id: function(){
    return this.belongsTo(Project, 'project_id');
  },
  hasTimestamps: true,
});

module.exports = Pledge;

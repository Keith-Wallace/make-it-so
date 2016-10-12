var express = require('express');
var router = require('./routes.js');
var bodyParser = require('body-parser');


var app = express();
app.set('port', 3000);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use(express.static(__dirname + '/../client'));

// start listening to requests on port 8000
app.listen(process.env.PORT || 8000);

console.log("listening to 8000")

app.use(router);

// export our app for testing and flexibility, required by index.js
module.exports = app;

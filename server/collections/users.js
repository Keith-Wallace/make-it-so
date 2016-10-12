var db = require('../db/index');
var User = require('../models/user');

var Users = new db.Collection();

Users.model = User;

module.exports = Users;


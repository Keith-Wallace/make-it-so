var db = require('../db/index.js');

var User = db.Model.extend({
  tablename: 'Users'
});

module.exports = User;


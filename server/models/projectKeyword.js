var db = require('../db/index.js');
var User = require('./keyword.js');
var Project = require('./project.js');


var ProjectKeyword = db.Model.extend({
  tableName: 'Project-Keywords',
  user_id: function(){
    return this.belongsTo(User, 'user_id');
  },
  project_id: function(){
    return this.belongsTo(Project, 'project_id');
  }


  hasTimestamps: false,
});

module.exports = ProjectKeyword;

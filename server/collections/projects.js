var db = require('../db/index');
var Project = require('../models/project');

var Projects = new db.Collection();

Projects.model = Project;

module.exports = Projects;


var db = require('../db/index');
var ProjectKeyword = require('../models/projectKeyword');

var ProjectKeywords = new db.Collection();

ProjectKeywords.model = ProjectKeyword;

module.exports = ProjectKeywords;


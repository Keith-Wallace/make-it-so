var db = require('../db/index');
var Keyword = require('../models/keyword');

var Keywords = new db.Collection();

Keywords.model = Keyword;

module.exports = Keywords;


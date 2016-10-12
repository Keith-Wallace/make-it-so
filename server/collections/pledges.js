var db = require('../db/index');
var Pledge = require('../models/pledge');

var Pledges = new db.Collection();

Pledges.model = Pledge;

module.exports = Pledges;


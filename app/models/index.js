const dbConfig = require("../config/keys.js");

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.individuals = require('./individual.model.js')(mongoose);

module.exports = db;
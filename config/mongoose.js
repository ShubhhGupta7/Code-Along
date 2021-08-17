const mongoose = require('mongoose');
const env = require('../config/enviroment.js');

mongoose.connect(`mongodb://localhost/${env.db}`);
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error Connecting to MongoDB."));
db.once('open', function() {
    console.log('Connected to the database.');
});

module.exports = db;
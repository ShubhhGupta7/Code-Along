const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error Connecting to MongoDB."));
db.once('open', function() {
    console.log('Connected to the database.');
});

module.exports = db;
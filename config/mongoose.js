const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/codeial_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error making connection to database'));

db.once('open', function(){
    console.log('Connection to database Successfull!');
});

module.exports = db;
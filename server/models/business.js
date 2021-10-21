let mongoose = require('mongoose');

//create a model class
let businessModel = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    contact: String
},
{
    collection: "info"
});

module.exports = mongoose.model('Info', businessModel);
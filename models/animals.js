var mongoose = require('mongoose');

// Create a model Animal with these fields:
// name(String)
// breed(String)
// dob(Date)
// gender(String)
// family(String)
// status(String)


var animalSchema = new mongoose.Schema({
  name: String,
  breed: String,
  dob: Date,
  gender: String,
  family: String,
  status: String
})

var Animal = mongoose.model('Animal', animalSchema)

module.exports = Animal;
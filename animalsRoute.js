var express = require('express');
var router = express.Router();

var moongoose = require('mongoose');
moongoose.connect('mongodb://localhost/animalshelter');
var Animal = require('./models/animals')

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

// INDEX
router.get('/', function(req, res) {

  Animal.find({}, function(err, animals){
    if(err) console.log(err)
    // res.render('index');
    res.json(animals);
  })

});

// CREATE

router.post('/', function(req, res){
  console.log('Data being posted to /animals:');
  console.log(req.body);

  var data = req.body;
  var newAnimal = new Animal({
    name: data.name,
    breed: data.breed,
    dob: data.dob,
    gender: data.gender,
    family: data.family,
  //the default for new arrivals is for them to be orphans
    status: 'orphan'
  })

  newAnimal.save(function (err) {
    if(err) console.log(err);
    console.log('Animal has been created!');
  });
  res.json(newAnimal);
})

// UPDATE

//actually we're just using this route to change the adoption status
//so this is more a custom route really

router.put('/:id', function(req, res){
  var outcome;
  req.body.status === 'orphan' ? outcome = 'adopted' : outcome = 'orphan';

  Animal.findByIdAndUpdate({_id: req.params.id}, {status: outcome}, {}, function(err, result){
    if(err) console.log(err);
    res.json(result);
  })
})

// test code to save one animal in the mongodb

// var doge = Animal({
//   name: 'Doge',
//   breed: 'Shiba Inu',
//   dob: '2014-12-31',
//   gender: 'M',
//   family: 'Dog',
//   status: 'adopted'
// })

// doge.save(function(err){
//   if(err) console.log(err);
//   console.log('Animal has been created!');
// })

module.exports = router;
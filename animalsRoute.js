var express = require('express');
var router = express.Router();
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
  res.json(req.body);
})

module.exports = router;
var express = require('express');
var router = express.Router();
var Animal = require('./models/animals')

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
  console.log('Data being posted to /animals');
  res.json(req);
})

module.exports = router;
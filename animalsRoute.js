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

module.exports = router;
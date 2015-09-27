var express = require('express');
var path = require('path');
var debug = require("debug");
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var app = express();

// setup modular routing for the animals resource
var animalsRes = require ('./animalsRoute');
app.use('/animals', animalsRes);

app.use(logger('dev'));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// root renders index
app.get('/', function(req, res){
  res.render('index')
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.listen(3000)
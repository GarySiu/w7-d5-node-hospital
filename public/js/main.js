//Are we linked up properly?
console.log('Hello animals!');

//declare all the things!
var endpoint = '/animals';
var Animal = Animal || {}
var View = View || {}

// Document ready. Here we go!
$(document).ready(function(){
  $animalList = $('#animal-list');
  $animalForm = $('#animal-form');
  Animal.all();
  View.initialize();
})

Animal = {
  all: function(){
    $.get(endpoint).done(function(data){
      console.log(data);
      render(data);
    })
  },
  create: function(animalParams){
    console.log('Posting to server: ' animalParams);
  }

}

View = {
  initialize: function(){
    $animalForm.on('submit', function(){
      event.preventDefault();
      Animal.create($(this).serialize());
    })   
  }
}

function render(data){
  $animalList.empty();
  $.each(data, function(i, animal){
    var result = '<li>'
    result += '<h3>' + animal.name + '</h3>'
    result += '<ul>'
    result += '<li><strong>' + 'Breed: </strong>' + animal.breed + '</li>'
    result += '<li><strong>' + 'Dob: </strong>' + animal.dob + '</li>'
    result += '<li><strong>' + 'Gender: </strong>' + animal.gender + '</li>'
    result += '<li><strong>' + 'Family: </strong>' + animal.family + '</li>'
    result += '<li><strong>' + 'Status: </strong>' + animal.status + '</li>'
    result += '</ul>'
    result += '</li>';
    $animalList.append(result);
  })
}
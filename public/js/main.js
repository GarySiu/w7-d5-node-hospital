//Are we linked up properly?
console.log('Hello animals!');

//declare all the things!
var endpoint = '/animals';
var Animal = Animal || {}

// Document ready. Here we go!
$(document).ready(function(){
  $animalList = $('#animal-list');
  Animal.all();
})

Animal = {
  all: function(){
    $.get(endpoint).done(function(data){
      console.log(data);
      render(data);
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
    result += '</ul>'
    result += '</li>';
    $animalList.append(result);
  })
}
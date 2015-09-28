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
      View.render(data);
    })
  },
  create: function(animalParams){
    console.log('Posting to server: ' + animalParams);
    $.post(endpoint, animalParams)
    .done(function(response){
      console.log('Received from server: ');
      console.log(response);
      View.render([response]);
      $animalForm.trigger('reset');
    })
  }

}

View = {
  initialize: function(){
    $animalForm.on('submit', function(){
      event.preventDefault();
      Animal.create($(this).serialize());
    })   
  },
  render: function (data){
  // $animalList.empty();
    $.each(data, function(i, animal){
      var template = '<li>'
      template += '<h3>' + animal.name + '</h3>'
      template += '<ul>'
      template += '<li><strong>' + 'Breed: </strong>' + animal.breed + '</li>'
      template += '<li><strong>' + 'Dob: </strong>' + animal.dob + '</li>'
      template += '<li><strong>' + 'Gender: </strong>' + animal.gender + '</li>'
      template += '<li><strong>' + 'Family: </strong>' + animal.family + '</li>'
      if(animal.status === 'adopted') {
        template += '<li><a href="#" class="adopt-link" data-id="' + animal._id + '">Abandon</li>'
      } else {
        template += '<li><a href="#" class="adopt-link" data-id="' + animal._id + '">Adopt</li>'
      }
      template += '</ul>'
      template += '</li>';
      $animalList.append(template);
    })
  }
}
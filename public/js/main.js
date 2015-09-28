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
    });

    $('body').on('click', '.adopt-link', function(){
      event.preventDefault();
        element = $(this);
      $.ajax({
        url: endpoint + '/' + element.data('id'),
        method: 'put',
        data: { status: element.data('status')}
      })
      .done(function(response){
        console.log(response);
        element.text() === 'Adopt' ? element.text('Abandon') : element.text('Adopt');
      })
    })
  },
  render: function (data){
    $.each(data, function(i, animal){
      var dob = new Date(animal.dob);
      var template = '<li class="pet">'
      template += '<h3>' + animal.name + '</h3>'
      template += '<ul>'
      template += '<li><strong>' + 'Breed: </strong>' + animal.breed + '</li>'
      template += '<li><strong>' + 'Dob: </strong>' + dob.toDateString() + '</li>'
      template += '<li><strong>' + 'Gender: </strong>' + animal.gender + '</li>'
      template += '<li><strong>' + 'Family: </strong>' + animal.family + '</li>'
      if(animal.status === 'adopted') {
        template += '<li><a href="#" class="adopt-link pure-button" data-status="adopted" data-id="' + animal._id + '">Abandon</li>'
      } else {
        template += '<li><a href="#" class="adopt-link pure-button" data-status="orphan" data-id="' + animal._id + '">Adopt</li>'
      }
      template += '</ul>'
      template += '</li>';
      $animalList.prepend(template);
    })
  }
}
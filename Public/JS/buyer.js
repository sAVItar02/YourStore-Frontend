$(function(){
      $('input[type="number"]').niceNumber();
});

$(document).ready(function() {
      const card = $('.card');
      const info_btn = $('.info');

      //INFO DISPLAY
      info_btn.on('click',  function(e) {
            e.preventDefault();
            console.log('clicked')
            $(this).parent().parent().children('.description').removeClass('description-hidden');
            
            $('.cross').on('click', function(e) {
                  e.preventDefault();
                  $(this).parent().addClass('description-hidden');
            })
      })

      //SECTION CHANGE
      const fruits = $('.fruits');
      const meat  = $('.meat');
      const dairy = $('.dairy');
      const snacks = $('.snacks');
      const drinks = $('.drinks');

      const fruits_btn = $('#fruits-btn'); 
      const meat_btn = $('#meat-btn'); 
      const dairy_btn = $('#dairy-btn'); 
      const snacks_btn = $('#snacks-btn'); 
      const drinks_btn = $('#drinks-btn'); 

      fruits.show();
      meat.hide();
      dairy.hide();
      snacks.hide();
      drinks.hide();

      fruits_btn.on('click', function(e) {
            e.preventDefault();
            meat.hide();
            dairy.hide();
            snacks.hide();
            drinks.hide();
            fruits.show();
      })

      meat_btn.on('click', function(e) {
            e.preventDefault();
            fruits.hide();
            dairy.hide();
            snacks.hide();
            drinks.hide();
            meat.show();
      })

      dairy_btn.on('click', function(e) {
            e.preventDefault();
            meat.hide();
            fruits.hide();
            snacks.hide();
            drinks.hide();
            dairy.show();
      })

      snacks_btn.on('click', function(e) {
            e.preventDefault();
            meat.hide();
            dairy.hide();
            fruits.hide();
            drinks.hide();
            snacks.show();
      })

      drinks_btn.on('click', function(e) {
            e.preventDefault();
            meat.hide();
            dairy.hide();
            snacks.hide();
            fruits.hide();
            drinks.show();
      })

});
$(document).ready(function() {
    $('.delivery-address').hide();
    $('.payment-methods').hide();
    $('.netbanking').hide();

    $('.choose-address').on('click', function(e) {
        e.preventDefault();

        // SAVE ADDRESS IN VARIABLE
        let address = $(this).parent().children('.address-main').text();
        let address_tag = $(this).parent().children('.address-tag').text();

        // HIDE CHOOSE ADDRESS DIV
        $('.address').hide();
        
        // SET DELIVERY ADDRESS VALUE
        $('.type').text(address_tag);
        $('.type-address').text(address);

        //SHOW DELIVERY ADDRESS DIV
        $('.delivery-address').show();

        // SHOW PAYMENT OPTIONS
        $('.payment-initial').hide();
        $('.payment-methods').show();
    })

    $('.change').on('click', function(e) {
        e.preventDefault();

        $('.delivery-address').hide();

        $('.address').show();

        $('.payment-methods').hide();

        $('.payment-initial').show();
    })

    $('.netbanking-btn').on('click', function(e) {
        $('.cod').hide();

        $('.netbanking').show();

        $('.cod-btn').removeClass('chosen');

        $('.netbanking-btn').addClass('chosen');
    })

    $('.cod-btn').on('click', function(e) {
        $('.netbanking').hide();

        $('.cod').show();

        $('.netbanking-btn').removeClass('chosen');

        $('.cod-btn').addClass('chosen');
    })

    // ADD NEW ADDRESS 

    $('.overlay').hide();
    $('.add-new-address-container').hide();

    $('.add-address').on('click', function(e) {
        e.preventDefault();

        $('.overlay').show();
        $('.add-new-address-container').show();

        $('body').addClass('overlay-open');
    })

    $('.cross').on('click', function(e) {
        e.preventDefault();

        $('.overlay').hide();
        $(this).parent().hide();

        $('body').removeClass('overlay-open');
    })

    $('.overlay').on('click', function(e) {
        e.preventDefault();

        $(this).hide();
        $(this).parent('body').children('.add-new-address-container').hide();

        $('body').removeClass('overlay-open');
    })
})
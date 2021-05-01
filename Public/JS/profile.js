$(document).ready(function() {
    $('.payments').hide();
    $('.favorites').hide();
    $('.addresses').hide();

    $('.payments-btn').on('click', function(e) {
        e.preventDefault();
        $('.orders').hide();
        $('.favorites').hide();
        $('.addresses').hide();

        $('.payments').show();

        $('.orders-btn').removeClass('active');
        $('.favorites-btn').removeClass('active');
        $('.addresses-btn').removeClass('active');

        $('.payments-btn').addClass('active');
    })

    $('.favorites-btn').on('click', function(e) {
        e.preventDefault();
        $('.orders').hide();
        $('.payments').hide();
        $('.addresses').hide();

        $('.favorites').show();

        $('.orders-btn').removeClass('active');
        $('.payments-btn').removeClass('active');
        $('.addresses-btn').removeClass('active');

        $('.favorites-btn').addClass('active');
    })

    $('.addresses-btn').on('click', function(e) {
        e.preventDefault();
        $('.orders').hide();
        $('.payments').hide();
        $('.favorites').hide();

        $('.addresses').show();

        $('.orders-btn').removeClass('active');
        $('.payments-btn').removeClass('active');
        $('.favorites-btn').removeClass('active');
        
        $('.addresses-btn').addClass('active');
    })

    $('.orders-btn').on('click', function(e) {
        e.preventDefault();
        $('.favorites').hide();
        $('.payments').hide();
        $('.addresses').hide();

        $('.orders').show();

        $('.favorites-btn').removeClass('active');
        $('.payments-btn').removeClass('active');
        $('.addresses-btn').removeClass('active');
        
        $('.orders-btn').addClass('active');
    })
});
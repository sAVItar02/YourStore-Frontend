$(document).ready(function() {
    const sign_in_btn = $('#sign-in-btn');
    const sign_up_btn = $('#sign-up-btn');
    const container = $('.container');

    sign_up_btn.on('click', () => {
        container.addClass('sign-up-mode');
        console.log('click');
    })

    sign_in_btn.on('click', () => {
        container.removeClass('sign-up-mode');
    })

    // $('.sign-up-container').hide();
    // $('.sign-in-container').hide();
    // $('.overlay').hide();

    $('.sign-in-as-shop').on('click', function(e) {
        e.preventDefault();

        $('.overlay').addClass('open-overlay');
        $('.sign-in-container').addClass('open');
    })

    $('.sign-up-as-shop').on('click', function(e) {
        e.preventDefault();

        $('.overlay').addClass('open-overlay');
        $('.sign-up-container').addClass('open');
    })

    $('.cross').on('click', function(e) {
        e.preventDefault();

        $(this).parent().removeClass('open');
        $('.overlay').removeClass('open-overlay');
    })
})
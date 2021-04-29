$(document).ready( function() {
    const location_btn = $('#location-btn');
    const location_sidebar = $('.location-sidebar');
    const cross = $('.cross');
    const overlay = $('.overlay');

    overlay.hide();

    location_btn.on('click', function() {
        location_sidebar.removeClass('closed');
        overlay.show();

        overlay.on('click', function() {
            $(this).parent().children('.location-sidebar').addClass('closed');
            overlay.hide();
        })

        cross.on('click', function() {
            $(this).parent().addClass('closed');
            overlay.hide();
        })
    });
});
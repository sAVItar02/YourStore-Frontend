$(document).ready( function() {
    //--------------------SIDEBAR-----------------

    const location_btn = $('#location-btn');
    const location_sidebar = $('.location-sidebar');
    const cross = $('.cross');
    const overlay = $('.overlay');

    overlay.hide();

    location_btn.on('click', function() {
        location_sidebar.removeClass('closed');
        overlay.show();
        $('body').addClass('overlay-open');

        overlay.on('click', function() {
            $(this).parent().children('.location-sidebar').addClass('closed');
            overlay.hide();
            $('body').removeClass('overlay-open');
        })

        cross.on('click', function() {
            $(this).parent().addClass('closed');
            overlay.hide();
            $('body').removeClass('overlay-open');
        })
    });

    //----------------GEOCODE---------------------
    
    function geoCode(address){
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2F2aXRhcjAyIiwiYSI6ImNrOGM1ZXo5OTAyY3Yzbm9jdHJ1bTVyajcifQ.15iE2VXcOcKOI1w6_tU2UQ&limit=1';
        fetch(url)
        .then((response) => response.json())
        .then( (data) => {
            console.log(data);
            const longitude = data.features[0].center[0];
            const latitude = data.features[0].center[1];
            const place_name = data.features[0].place_name;
            
            let location_div = `
                <div class="location-result"> <p> ${place_name} </p> </div>
            `
            $('.location-buffer').empty();
            $('.location-buffer').append(location_div);

            $('.location-result').on('click', function(e) {
                e.preventDefault();
                overlay.hide();
                $(this).parents('.location-sidebar').addClass('closed');

                $(this).parents('body').children('.navbar').children('#location-btn').children('.nav-link').children('.link-text').text(place_name);
            })

            $('body').removeClass('overlay-open');
        })
    }

    $('.search-location').on('click', function() {
        let address = $('#location').val();
        let data = geoCode(address);
    })

    //----------------SLICK--------------------
    
    $('.carousel').slick({
        autoplay: true,
        dots: true,
        arrows: false,
    });

    $('.trending-carousel').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
      });

    
}); 
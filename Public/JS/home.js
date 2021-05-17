$(document).ready( function() {
    $(".overlay").hide();

    // ------------VARS-------------------
    const location_btn = $('#location-btn');
    const location_sidebar = $('.location-sidebar');
    const cross = $('.cross');
    const overlay = $('.overlay');


    if(!localStorage.getItem('authToken'))
    {
        $("#profile-text").text("Profile");
        hideLoader($('.overlay-white'));
        openLocationSidebar();
    } else {
        getProfile();
        openLocationSidebar();
    }

    function showLoader(overlay) {
        overlay.show();
        $('.spinner').show();
        $('body').addClass('overlay-open');
    }

    function hideLoader(overlay) {
        overlay.hide();
        $('.spinner').hide();
        if(location_sidebar.hasClass("closed")) {
            $('body').removeClass('overlay-open');
        }
    }

    function hideOverlay(elementClass, classToHide) {
        overlay.parent().children(elementClass).addClass(classToHide);
        overlay.hide();
        $('body').removeClass('overlay-open');
    }

    function validate(element) {
        let name = element[0].name;
        if(name == "name") {
            if(element[0].value == "" || element[0].value.length == 0) {
                element.parent('.input-field').addClass('invalid');
                throw Error("name");
            }
        } else if(name == "desc") {
            if(element[0].value == "" || element[0].value.length == 0) {
                element.parent('.input-field').addClass('invalid');
                throw Error("desc");
            }
        } else if(name == "cost") {
            if(element[0].value == "" || element[0].value.length == 0) {
                element.parent('.input-field').addClass('invalid');
                throw Error("cost");
            }
        } else if(name == "quantity") {
            if(element[0].value == "" || element[0].value <= 0) {
                element.parent('.input-field').addClass('invalid');
                throw Error("quantity");
            }
        }
    }
    //--------------------SIDEBAR-----------------
    location_btn.on('click', function() {
        openLocationSidebar();
    });

    function openLocationSidebar() {
        location_sidebar.removeClass('closed');
        overlay.show();
        $('body').addClass('overlay-open');

        $('.location-buffer').empty();
        $('#location').val('');
        $('.gps-location-buffer').empty();

        cross.on('click', function() {
            $(this).parent().addClass('closed');
            overlay.hide();
            $('body').removeClass('overlay-open');
        })
    }

    //----------------REQUEST POPUP/ SEND REQUEST---------------

    $(".post-request-btn").on("click", function(e) {
        e.preventDefault();

        $(".overlay").show();
        $("body").addClass("overlay-open");
        $(".request-popup").removeClass("hidden");
    })
    
    $(".cross-req").on("click", function(e) {
        e.preventDefault();
        
        $(".overlay").hide();
        $("body").removeClass("overlay-open");
        $(".request-popup").addClass("hidden");
    })

    $(".request-button").on("click", function(e) {
        e.preventDefault();

        const request_api = "https://yourstore-swe.herokuapp.com/user/requestItem";

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('authToken')}`);

        let data = {
            name: $('#item-name').val(),
            desc: $('#item-desc').val(),
            quantity: $('#item-quantity').val(),
        }

        let json = JSON.stringify(data);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: json,
        };

        try {
            validate($('#item-name'));
            validate($('#item-desc'));
            validate($('#item-quantity'));

            try {
                fetch(request_api, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if(result.error || result.status == "failure") {
                        swal("Check again!", "" ,"error");
                    } else {
                        $(".overlay").hide();
                        $("body").removeClass("overlay-open");
                        $(".request-popup").addClass("hidden");
                        $('.request-form')[0].reset();
                        swal("Success", "You're all set!", "success");
                    }
                })
            } catch (e) {
                swal("Oops something went wrong!", "some error occurred!", "error");
            }

        } catch(e) {
            swal("Oops you missed something", "Check " + e.message, "error");
        }
    })

    //----------------GEOCODE---------------------
    
    function geoCode(address) {
        // const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY'
        
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2F2aXRhcjAyIiwiYSI6ImNrOGM1ZXo5OTAyY3Yzbm9jdHJ1bTVyajcifQ.15iE2VXcOcKOI1w6_tU2UQ&limit=5';
        fetch(url)
        .then((response) => response.json())
        .then( (data) => {
            console.log(data);
            $('.location-buffer').empty();
            $('body').addClass('overlay-open');
            
            if(data.features.length == 0) {
                let location_div = `
                <div class="location-result-error"> <p> Please enter a valid location </p> </div>
                `
                $('.location-buffer').append(location_div);
            }

            for(let i=0; i<data.features.length; i++){
              const longitude = data.features[i].center[0];
              const latitude = data.features[i].center[1];
              const place_name = data.features[i].place_name;
              
              let location_div = `
                  <div class="location-result"> <p> ${place_name} </p> </div>
              `
              $('.location-buffer').append(location_div);
            }

            $('.location-result').on('click', function(e) {
                e.preventDefault();
                overlay.hide();
                $(this).parents('.location-sidebar').addClass('closed');

                $(this).parents('body').children('.navbar').children('#location-btn').children('.nav-link').children('.link-text').text($(this).text());
                $('body').removeClass('overlay-open')
            })

            // $('body').removeClass('overlay-open');
        })
    }

    $('.search-location').on('click', function() {
        $('body').addClass('overlay-open');
        let address = $('#location').val();
        let data = geoCode(address);
        $('body').removeClass('overlay-open');
    })

    //----------------REVERSE GEOCODE--------------

    
    $('.current-location').on('click', function(e) {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(successfulLookup);
    })
    
    const successfulLookup = (position) => {
        const {longitude, latitude} = position.coords;
        const reverseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(longitude) +','+ encodeURIComponent(latitude) +'.json?access_token=pk.eyJ1Ijoic2F2aXRhcjAyIiwiYSI6ImNrOGM1ZXo5OTAyY3Yzbm9jdHJ1bTVyajcifQ.15iE2VXcOcKOI1w6_tU2UQ';

        fetch(reverseUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            $('.gps-location-buffer').empty();
            for(let i=0; i<data.features.length; i++) {
                const longitude = data.features[i].center[0];
                const latitude = data.features[i].center[1];
                const place_name = data.features[i].place_name;
                
                let location_div = `
                    <div class="location-result"> <p> ${place_name} </p> </div>
                `
                $('.gps-location-buffer').append(location_div);
            }

            $('.location-result').on('click', function(e) {
                e.preventDefault();
                overlay.hide();
                $(this).parents('.location-sidebar').addClass('closed');

                $(this).parents('body').children('.navbar').children('#location-btn').children('.nav-link').children('.link-text').text($(this).text());
                $('body').removeClass('overlay-open')
            })
        })
    }


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

    
    //----------------PROFILE------------------

    function getProfile() {
        const profile_api = "https://yourstore-swe.herokuapp.com/users/me";

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append("Authorization", `${localStorage.getItem('authToken')}`);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        }

        fetch(profile_api, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            $("#profile-text").text(result.name);
            hideLoader($(".overlay-white"));
        })
    }
}); 
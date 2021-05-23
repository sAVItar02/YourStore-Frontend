$(document).ready(function() {
    $('input[type="number"]').niceNumber();
    $(".overlay").hide();

    if(!sessionStorage.getItem("shopID")) {
        hideLoader($(".overlay-white"));
        $(".select-a-shop").removeClass("hidden");
    } else {
        getShop().then((result) => {
            createFruitsAndVegCard(result);
            hideLoader($(".overlay-white"));
        })
    }

    const card = $('.card');
    const info_btn = $('.info');

    //--------------------INFO DISPLAY-----------------------------

    $("body").on('click', '.info', function(e) {
        console.log($(this));
        e.preventDefault();
        $(this).parent().parent().parent().children('.description').removeClass('description-hidden');
            
        $('.cross').on('click', function(e) {
            e.preventDefault();
            $(this).parent().addClass('description-hidden');
        })
    })

      //--------------------OVERLAY FUNCTIONS-------------------------
    function showLoader(overlay) {
        overlay.show();
        $('.spinner').show();
        $('body').addClass('overlay-open');
    }
    
    function hideLoader(overlay) {
        overlay.hide();
        $('.spinner').hide();
        $("body").removeClass("overlay-open");
    }
    
    function hideOverlay(elementClass, classToHide) {
        overlay.parent().children(elementClass).addClass(classToHide);
        overlay.hide();
        $('body').removeClass('overlay-open');
    }

    //--------------------SECTION CHANGE----------------------------

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
        showLoader($(".overlay"));
        e.preventDefault();
        meat.hide();
        dairy.hide();
        snacks.hide();
        drinks.hide();
        fruits.show();
        getShop().then((result) => {
            createFruitsAndVegCard(result);
        })
    })

    meat_btn.on('click', function(e) {
        showLoader($(".overlay"));
        e.preventDefault();
        fruits.hide();
        dairy.hide();
        snacks.hide();
        drinks.hide();
        meat.show();

        getShop().then((result) => {
            createTaggedCard(result, 'meat', $("#meat-shop"));
        })
    })

    dairy_btn.on('click', function(e) {
        showLoader($(".overlay"));
        e.preventDefault();
        meat.hide();
        fruits.hide();
        snacks.hide();
        drinks.hide();
        dairy.show();

        getShop().then((result) => {
            createTaggedCard(result, 'dairy', $("#dairy-shop"));
        })
    })

    snacks_btn.on('click', function(e) {
        showLoader($(".overlay"));
        e.preventDefault();
        meat.hide();
        dairy.hide();
        fruits.hide();
        drinks.hide();
        snacks.show();

        getShop().then((result) => {
            createTaggedCard(result, 'snacks', $("#snacks-shop"));
        })
    })

    drinks_btn.on('click', function(e) {
        showLoader($(".overlay"));
        e.preventDefault();
        meat.hide();
        dairy.hide();
        snacks.hide();
        fruits.hide();
        drinks.show();

        getShop().then((result) => {
            createTaggedCard(result, 'drinks', $("#drinks-shop"));
        })
    })

      
    //------------------------GET SHOP---------------------------

    function getShop() {
        let shopID = sessionStorage.getItem("shopID");
        const getShop_api = `https://yourstore-swe.herokuapp.com/shop/${shopID}`;

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let requestOptions = {
            method: 'GET',
        }

        try {
            return fetch(getShop_api, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                hideLoader($(".overlay"))
                return result;
            })
            .catch((e) => {
                hideLoader($(".overlay"))
                swal("Oops something went wrong!", "" + e, "error") 
                console.log(e);
            })
        } catch (e) {   
            hideLoader($(".overlay"))  
            swal("Oops something went wrong!", "" + e, "error")
            console.log(e);
        }
    }

    //-----------------------CREATE CARD FUNCTIONS-----------------------

    function createFruitsAndVegCard(result) {
        let count = 0;

        result.data.items.forEach(item => {
            if(item.tags == "fruits" || item.tags == "vegetables") {
                count++;
            }
        });

        if(count == 0) {
            $('#fruit-shop').empty();
            $('#fruit-shop').html("<div class='no-products-text'>No fruits or vegetables</div>");
        } else {
            let img = '';
            let output = ``;

            result.data.items.forEach(item => {
                let img = `./Public/assets/default.jpg`;
                if(item.picture) {
                    img = item.picture;
                }

                let max_quatity = 10
                if(item.quantity < 10) {
                    max_quatity = item.quantity;
                }

                if(item.tags == "fruits" || item.tags == "vegetables") {
                    output += `
                    <div class="card">
                        <img src="${img}" alt="" class="product-img">
                        <div class="product-details">
                            <div class="product-name">${item.itemName}</div>
                            <div class="product-cost">&#8377; ${item.cost}</div>
                            <div class="product-amount">1 Kg</div>
                            <div class="quantity-input-container">
                                <input type="number" name="quantity" min="0" max="${max_quatity}" value="0" class="product-quantity">
                                <span class="info"><img src="https://img.icons8.com/cotton/64/000000/info--v5.png"/></span>
                            </div>
                            
                            <div class="btn-container">
                                <div class="itemID">${item._id}</div>
                                <button class="add-to-cart">Add to cart <i class="fas fa-shopping-cart"></i></button>
                            </div>  
                        </div>

                        <div class="description description-hidden">
                            <span class="cross">
                                <img src="https://img.icons8.com/ios/50/000000/circled-x.png"/>
                            </span>
                            <p class="description-text">${item.itemDesc}</p>
                        </div>  
                    </div>
                    `
                }
            })

            $('#fruit-shop').empty();
            $('#fruit-shop').html(output);
            $('input[type="number"]').niceNumber();
        }
    }    

    function createTaggedCard(result, tag, container) {
        let count = 0;

        result.data.items.forEach(item => {
            if(item.tags == tag) {
                count++;
            }
        })

        if(count==0) {
            container.empty();
            container.html(`<div class='no-products-text'>No products of this kind</div>`);
        } else {
            let img = './Public/assets/default.jpg';
            let output = ``;

            result.data.items.forEach(item => {
                if(item.picture) {
                    img = item.picture;
                }

                let max_quatity = 10
                if(item.quantity < 10) {
                    max_quatity = item.quantity;
                }

                if(item.tags == tag) {
                    output += `
                    <div class="card">
                        <img src="${img}" alt="" class="product-img">
                        <div class="product-details">
                            <div class="product-name">${item.itemName}</div>
                            <div class="product-cost">&#8377; ${item.cost}</div>
                            <div class="product-amount">1 kg</div>
                            <div class="quantity-input-container">
                                <input type="number" name="quantity" min="0" max="${max_quatity}" value="0" class="product-quantity">
                                <span class="info"><img src="https://img.icons8.com/cotton/64/000000/info--v5.png"/></span>
                            </div>
                            <div class="btn-container">
                                <div class="itemID">${item._id}</div>
                                <button class="add-to-cart">Add to cart <i class="fas fa-shopping-cart"></i></button>
                            </div>  
                        </div>

                        <div class="description description-hidden">
                            <span class="cross">
                                <img src="https://img.icons8.com/ios/50/000000/circled-x.png"/>
                            </span>
                            <p class="description-text">${item.itemDesc}</p>
                        </div>  
                    </div>
                    `
                }
            })

            container.empty();
            container.html(output);
            $('input[type="number"]').niceNumber();
        }    
    }

});
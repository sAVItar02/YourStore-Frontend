const inpFile = document.getElementById("inpFile");
const previewContainer = document.getElementById("imagePreview");
const previewImage = document.querySelector(".preview-image");
const previewText = document.querySelector(".preview-text");

const customButton = document.querySelector(".custom-input");

customButton.addEventListener("click", function() {
    inpFile.click();
})

inpFile.addEventListener("change", function(e) {
    const file = this.files[0];

    if(file) {
        const reader = new FileReader();

        previewText.style.display = "none";
        previewImage.style.display = "block";
        previewContainer.style.border = "none";

        reader.addEventListener("load", function() {
            previewImage.setAttribute("src", this.result)
        })

        reader.readAsDataURL(file);
    } else {
        previewText.style.display = null;
        previewImage.style.display = null;
        previewContainer.style.border = null;
        previewImage.setAttribute("src", "");
    }
})

$(document).ready(function() {
    $('.spinner').hide();

    $('.profile').hide();

    function showLoader() {
        $('.overlay').show();
        $('.spinner').show();
    }

    function hideLoader() {
        $('.overlay').hide();
        $('.spinner').hide();
    }

    //-----------ADD PRODUCTS----------------

    $('.overlay').hide();
    $('.add-products-container').hide();
    $('body').removeClass('overlay-open');

    $('.add-products-btn').on('click', function() {
        $('.overlay').show();
        $('.add-products-container').show();

        $('body').addClass('overlay-open');
    })

    $('.cross').on('click', function() {
        $('.overlay').hide();
        $(this).parent().hide();

        $('body').removeClass('overlay-open');
    })

    $('.overlay').on('click', function() {
        $('.overlay').hide();
        $(this).parent('body').children('.add-products-container').hide();

        $('body').removeClass('overlay-open');
    })

    //-----------------PROFILE------------------
    $('.count').counterUp({
        delay: 10,
        time: 1000
    });

    //-----------------GET PROFILE--------------

    const get_profile_url = 'https://yourstore-swe.herokuapp.com/stores/myStore';
    const get_products = 'https://yourstore-swe.herokuapp.com/myProducts';

    $("#profile-btn").on('click', function(e) {
        e.preventDefault();
        showLoader();

        $('.products').hide();

        $('.profile').show();

        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('shopAuth')}`);
    
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        }

        try {
            fetch(get_profile_url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                
                $("#shop-name").val(result.shopName);
                $("#shop-desc").val(result.shopDescription);
                $("#shop-email").val(result.email);
                $("#shop-owner").val(result.shopOwner);
                $("#shop-address").val(result.location.address);
                $("#shop-landmark").val(result.location.landmark);
                hideLoader();
            })
            .catch((e) => {
                console.log(e);
                hideLoader();
            })
        } catch (e) {
            console.log(e);
            hideLoader();
        }

    })

    $("#products-btn").on('click', function(e) {
        e.preventDefault();
        showLoader();

        $('.tag').removeClass('active')
        $('#all-products').addClass('active')

        $('.profile').hide();
        $('.fruits-veggies-container').hide();
        $('.meat-container').hide();
        $('.dairy-container').hide();
        $('.snacks-container').hide();
        $('.drinks-container').hide();

        $('.products').show();
        $('.all-container').show();

        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('shopAuth')}`);
    
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        }

        try {
            fetch(get_products, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                createAllCard(result);
                hideLoader();
            })
            .catch((e) => {
                console.log(e);
                hideLoader();
            })
        } catch (e) {
            console.log(e);
            hideLoader();
        }
    })

    $("#fruits-and-veg").on('click', function(e) {
        e.preventDefault();
        showLoader();

        $(".tag").removeClass('active');
        $(this).addClass('active');

        $('.all-container').hide();
        $('.meat-container').hide();
        $('.dairy-container').hide();
        $('.snacks-container').hide();
        $('.drinks-container').hide();

        $('.fruits-veggies-container').show();

        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('shopAuth')}`);
    
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        }

        try {
            fetch(get_products, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                createFruitsAndVegCard(result);
                hideLoader();
            })
            .catch((e) => {
                console.log(e);
                hideLoader();
            })
        } catch (e) {
            console.log(e);
            hideLoader();
        }

    })

    function createAllCard(result) {
        if(result.length == 0) {
            $('.all-container').empty();
            $('.all-container').html("<div class='no-products-text'>No products yet!</div>");
        } else {
            let img = '';
            let output = ``;

            for(i=0; i<result.length; i++) {
                if(!result[i].picture) {
                    img = './Public/assets/default.jpg';
                } else {
                    img = result[i].picture;
                }
                output += `
                <div class="card">
                    <img src="${img}">
                    <div class="details">
                        <div class="product-name">${result[i].itemName}</div>
                        <div class="product-cost">Cost: <span class="cost">&#8377;${result[i].cost}</span></div>
                        <div class="product-quantity">Quantity: <span class="quantity">${result[i].quantity} Kg</span></div>
                        <div class="product-tag">${result[i].tags}</div>
                    </div>
                </div>
                `
            }

            $(".all-container").empty();
            $(".all-container").html(output);
        }
    }

    function createFruitsAndVegCard(result) {
        let count = 0;

        for(i=0; i<result.length; i++) {
            if(result[i].tags == "fruits" || result[i].tags == "vegetables") {
                count++;
            }
        }

        console.log(count);

        if(count == 0) {
            $('.fruits-veggies').empty();
            $('.fruits-veggies').html("<div class='no-products-text'>No products yet!</div>");
        } else {
            let img = '';
            let output = ``;

            for(i=0; i<result.length; i++) {
                if(!result[i].picture) {
                    img = './Public/assets/default.jpg';
                } else {
                    img = result[i].picture;
                }

                if(result[i].tags == "fruits" || result[i].tags == "vegetables") {
                    output += `
                    <div class="card">
                        <img src="${img}">
                        <div class="details">
                            <div class="product-name">${result[i].itemName}</div>
                            <div class="product-cost">Cost: <span class="cost">&#8377;${result[i].cost}</span></div>
                            <div class="product-quantity">Quantity: <span class="quantity">${result[i].quantity} Kg</span></div>
                        </div>
                    </div>
                    `
                }

                $('.fruits-veggies-container').empty();
                $('.fruits-veggies-container').html(output);
            }
        }
    }    
})


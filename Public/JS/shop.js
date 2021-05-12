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
    $('.products').hide();

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
    
    //------------------------------------------

    //-----------------PROFILE------------------
    $('.count').counterUp({
        delay: 10,
        time: 1000
    });
})


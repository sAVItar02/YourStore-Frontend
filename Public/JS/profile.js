$(document).ready(function() {
    $(".not-logged-in").hide();

    if(!localStorage.getItem('authToken')) {
        $(".not-logged-in").show();
    } else {
        getProfile().then((result) => {
            $("#profile-text").text(result.name);
            getOrders();
        })
    }

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

        try {
            getProfile().then((result) => {
                if(result.paymentHistory.length == 0) {
                    $('.payments').empty();
                    $('.payments').html("<div class='no-products-text'>No payments yet!</div>");
                } else {
                    result.paymentHistory.forEach(item => {
                        let output = ``;

                        date = item.date.split("T");

                        output += `
                        <div class="payment-card">
                            <div class="payments-shopID">
                            <strong class="shopID-text">ShopID: </strong>${item.shopID}
                            </div>
                            <div class="payments-date">
                                <strong>Date: </strong> ${date[0]}
                            </div>
                            <div class="paments-cost">
                                <strong>Total cost: </strong> ${item.totalCost}
                            </div>
                        </div>
                        `

                        $(".payments-container").empty();
                        $(".payments-container").html(output);
                    })
                }
            })
        } catch(e) {
            console.log(e);
        }
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

        try {
            getProfile().then((result) => {
                console.log(result.address.length == 0)
                if(result.address.length == 0) {
                    $('.address-container').empty();
                    $('.address-container').html("<div class='no-products-text'>No addresses added!</div>");
                } else {
                    let output = ``;

                    for(i=0; i<result.address.length; i++) {
                        output += `
                        <div class="address-card">
                            <i class="fas fa-home"></i>
                            <div class="address-text">
                                <p class="home">Home</p>
                                <p>${result.address[i]}</p>
                                <button class="delete-address">Delete</button>
                            </div>
                        </div>
                        `
                    }

                    $('.address-container').empty();
                    $('.address-container').html(output);
                }
            })
        } catch(e) {
            console.log(e);
        }
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

        try {
            getOrders();
        } catch(e) {
            console.log(e);
        }
        
    })

    function getOrders() {
        getProfile().then((result) => {
            $(".orders-container").empty();
            if(result.PendingOrders.length == 0) {
                $('.orders-container').empty();
                $('.orders-container').html("<div class='no-products-text'>No orders yet!</div>");
            } else {

                result.PendingOrders.forEach(order => {
                    let output = ``;
                    order.order.items.forEach(item => {
                        let img;
                        if(item.picture) {
                            img = item.picture;
                        } else {
                            img = './Public/assets/default.jpg';
                        }

                        output += `
                        <div class="order-card">
                            <div class="order-name-container">
                                <img src="${img}" alt="No image found">
                                ${item.itemName}
                            </div>
                            <div class="order-quantity">
                                <strong>Quantity: </strong> ${item.quantity}
                            </div>
                            <div class="order-cost">
                                <strong>Cost: </strong> ${item.cost}
                            </div>
                        </div>
                        `
                    });

                    $('.orders-container').append(output);
                });
                
                // for(i=0; i<result.PendingOrders.length; i++) {
                //     let output = ``;
                //     for(j=0; j<result.PendingOrders[i].order.items.length; i++) {
                //         let img;
                //         if(result.PendingOrders[i].order.items[j].picture) {
                //             img = result.PendingOrders[i].order.items[j].picture;
                //         } else {
                //             img = './Public/assets/default.jpg';
                //         }

                        // output += `
                        // <div class="order-card">
                        //     <div class="order-name-container">
                        //         <img src="${img}" alt="No image found">
                        //         ${result.PendingOrders[i].order.items[j].itemName}
                        //     </div>
                        //     <div class="order-quantity">
                        //         <strong>Quantity: </strong> ${result.PendingOrders[i].order.items[j].quantity}
                        //     </div>
                        //     <div class="order-cost">
                        //         <strong>Cost: </strong> ${result.PendingOrders[i].order.items[j].cost}
                        //     </div>
                        // </div>
                        // `
                //     }

                //     $('.orders-container').append(output);
                // }
            }
        })
    }
    

    function getProfile() {
        const profile_api = "https://yourstore-swe.herokuapp.com/user/me";

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append("Authorization", `${localStorage.getItem('authToken')}`);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        }

        try {
            return fetch(profile_api, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                return result
            })
            .catch((e) => {
                console.log(e);
            })
        } catch (e) {
            console.log(e);
        }
    }
});
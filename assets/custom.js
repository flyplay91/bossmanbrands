//Mobile Main menu 

if($(window).width() < 768) {

    $('.menu.media .menu_content_links ul.level-1>li.hasChild>a, .menu.media .menu_content_links li a.back').on('click', function(e) {
        $(this).closest('li.hasChild').find('.level-2').toggleClass('to-show');
        e.stopImmediatePropagation();
        return false;
    });

    $('.menu.media .menu_content_links ul.level-1>li ul.level-2>li>a').on('click', function(e) {
        $(this).toggleClass('to-slide').next('ul.level-3').slideToggle();
        if($(this).hasClass('exit')) {
            $(this).siblings('.back').trigger('click');
            $('.menu.media .menu_content > .menu_content_wrap > .menu_content_head a.exit').trigger('click');
        }
        e.stopImmediatePropagation();
        return false;
    });

    $('.header.media .icons a#menu, .menu.media .menu_content_head a.exit').on('click', function() {
        $('body').toggleClass('to-overflow');
    });

}

//Banner Added To Cart

function renderPrice(entity, priceType) {

    if (entity) {

        switch (priceType) {
            case 'price' : { var originPrice = entity.price; } break;
            case 'total_price' : { var originPrice = entity.total_price; } break;
        }

        if (originPrice) {

            let entityPrice = '$' + originPrice;
            let priceInt = entityPrice.substr(0, entityPrice.length - 2);
            let priceFloat = entityPrice.substr(-2);

            return priceInt + '.' + priceFloat;

        }

    }

    return '$0.00';

}

function showPopupCart() {
    
	let popup = $('.atc-banner--container');
  
  	if(popup.hasClass('show-cart-popup')==false) {
      return;
  	}
  	
	/*** is baner exist ***/
    if ($('#qab_container').length)
    {
    	let bannerHeight = $('#qab_container').css("height");
        popup.css("top", bannerHeight);
    } else
    {
    	let headerHeight = $('#shopify-section-header').height();
        popup.css("top", headerHeight);
    }
  
  	/*** show baner ***/ 
  
//   	$('.atc-banner--container').slideDown('slow').delay(500);
};

function closePopupCart() {
  	let banner = $('.atc-banner--container');
//   	banner.slideUp('slow').delay(500);
  	banner.removeClass('show-cart-popup');
}


/*** loader user cart ***/
function showLoaderUserCart() {
  	let span = $('.header.big .user-cart span.count');
  	span.removeClass('count');
	span.addClass('spinner');  
}

function hideLoaderUserCart() {
  	let span = $('.header.big .user-cart span.spinner');
  	span.removeClass('spinner');
  	span.addClass('count');
}
/*** end loader user cart ***/

function setCartData() {
  	$.getJSON('/cart', function(cart) {
      	let subtotal = renderPrice(cart, 'total_price');
      let subtotalWithOutSign = parseFloat(subtotal.split('$')['1']);
        let unFreeShippingPrice = Math.abs(subtotalWithOutSign - 35.00).toFixed(2);
        let unFreeShippingPercent = parseInt(subtotalWithOutSign / 35 * 100);
      	let cartCount = cart.item_count;
      
      
      	if (subtotalWithOutSign < 35.00) {
          $('.unlock-free-bar > label').html('Add $' + unFreeShippingPrice + ' to unlock free shipping.');
          $('.unlock-free-bar .stat-bar-rating').css('width', unFreeShippingPercent + '%');
        } else {
          $(".unlock-free-bar > label").html("CONGRATS! YOU'VE UNLOCKED FREE SHIPPING!");
          $('.unlock-free-bar .stat-bar-rating').css('width', '100%');
        }

        $('.black-overlay').addClass('active');
      	$('.atc-subtotal--price').html(subtotal);
      	$('.atc-button--viewcart span').html(Number(cartCount));
      	$('.header-cart span').html(Number(cartCount));
      	$('.cart_count_mobile').html(Number(cartCount));
      	$('.header.big .user-cart .count, .header.big .user-cart .spinner').html(Number(cartCount));
      	hideLoaderUserCart();
      
      var cart_items = cart.items; 
      var html = '';
      console.log(cart_items.length);
      if (cart_items.length == 1) {
        $('.atc-banner--product').addClass('one-item');
      }
      
      for (i = 0; i < cart_items.length; i++) {
        
        html += '<div class="atc--product">';
          html += '<div class="atc--product-image" data-atc-banner-product-image="">';
              html += '<img src="' + cart_items[i].featured_image.url + '" alt="Proudct Image">';
          html += '</div>';
          html += '<div class="atc--product-details">';  
            html += '<h2 class="atc--product-details--title" data-atc-banner-product-title="">' + cart_items[i].title + '</h2>';
            html += '<span class="atc--product-details--options" data-atc-banner-product-options=""></span>';
            html += '<span class="atc--product-details--price money" data-atc-banner-product-price="">Price: ' + Shopify.formatMoney(cart_items[i].final_price, "${{amount}}") + '</span>';
            html += '<span class="atc--product-details--qty">Qty: ' + cart_items[i].quantity + '</span>'
            html += '<a href="javascript: void(0)" data-variant-id="' + cart_items[i].id + '" class="remove-qty-sidecart">Remove</a>';
          html += '</div>';
        html += '</div>';
      }
      
      $('.side-cart-block .atc--product').remove();
      $('.side-cart-block').append(html);
      
      var $body = $(document.body);
      $('body').on('click', '.remove-qty-sidecart', function(e) {
        var variantId = $(this).data('variant-id');

        $.ajax({
          type: 'POST',
          url: '/cart/change.js',
          data: {
            id : variantId,
            quantity : 0
          },
          dataType: 'json',
          success: function(line_item) {
            ShopifyAPI.getCart(ajaxCart.cartUpdateCallback);
          },
          error: function(XMLHttpRequest, textStatus) {
            if ((typeof errorCallback) === 'function') {
              errorCallback(XMLHttpRequest, textStatus);
            }
            else {
              ShopifyAPI.onError(XMLHttpRequest, textStatus);
            }
            $body.trigger('errorAddItem.ajaxCart', [XMLHttpRequest, textStatus]);
          },
          complete: function(jqxhr, text) {
            $body.trigger('completeAddItem.ajaxCart', [this, jqxhr, text]);
          }
        });

      });
    });
}


$(document.body).on('beforeAddItem.ajaxCart', function(event, params, data) {
  	showLoaderUserCart();
  	closePopupCart();
});

$(document.body).on('completeAddItem.ajaxCart', function(event, params, data){
  
	let product = data.responseJSON;
	let productPrice = renderPrice(product, 'price');

	/*** show data ***/
// 	$('.atc--product-details--title').html(product.title);
// 	$('.atc--product-details--price').html(productPrice);

// 	/*** image ***/
//   	if (product.featured_image.url) {
//       	$('.atc--product-image img').attr("src",product.featured_image.url);
//     } else {
//     	let noImage = "//cdn.shopify.com/s/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_250x.gif";
// 		$('.atc--product-image img').attr("src",noImage);
//     }

  	$('.atc-banner--container').addClass('show-cart-popup');
  	$('body').css('overflow', 'hidden');
  
	setCartData();
  	showPopupCart();
});



$('.atc-banner--close').on('click', function () {
  	closePopupCart();
  $('body').css('overflow', 'visible');
  $('.black-overlay').removeClass('active');
});


$(document).ready(function(){

	let $body = $(document.body);
	if($(window).width() >= 1024){
	  	$(window).scroll(function () {
		    if ($(this).scrollTop() > 75) {
              
              if($('body').hasClass('site-header-sticky--scrolled')) {
              	
              }else{
              	$body.trigger("showScrolledMenu");
              }

		    } else if($('body').hasClass('site-header-sticky--scrolled')) {
              	$body.trigger("hideScrolledMenu");
		    }
		});
	}

	$body.on('showScrolledMenu', function(){
          //$('body').addClass('site-header-sticky--scrolled');
        $('body').addClass('site-header-sticky--scrolled');
        $('.header.big .menu').removeClass('visible', 500);
      	showPopupCart();
	});

	$body.on('hideScrolledMenu', function(){
        $('body').removeClass('site-header-sticky--scrolled');
        $('.header.big .menu').addClass('visible', 500);
        showPopupCart();
	});

});

$('#menu--burger').on('click', function (event) {
  	
    event.preventDefault();

    $('.header.big .menu').toggleClass('visible', 500);

    showPopupCart();
});

render_popup = function (cart) {
    if (typeof cart === 'undefined') {
        return;
    }

    $('.mobile-add-confirm ul').html('');
    if (cart.items.length > 0) {
        $.each(cart.items, function (k, v) {

            $('.mobile-add-confirm ul').append(
                '<li>'+
                '<div class="modal_image product-image">' +
                '<a href="'+ v.url +'"><img width="100" src="'+ v.image +'"></a>'
                + '</div>' +
                '<div class="modal_title product-info"><h3>'+ v.product_title +'</h3>'
                + '<p class="modal_price_and_qty">$ '+ v.price/100 +' x '+ v.quantity +'</p>' + '<p>' + '<strong class="modal_price">$ '+v.line_price/100 +'</strong>' + '</p>' + '</div>' + '</li>'
            );
        });
        $('.total_price').html(cart.total_price/100);
        $('.free_shipping').html(35-cart.total_price/100);
    }
};

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';

}

$('.mobile-add-confirm .fa-window-close').on('click', function () {
    $('.mobile-add-confirm').hide();
    setCookie('show_popup', false);
    setCookie('popup_done', true);

});

setTimeout(function(){

    $(document).ready(function(){
      
      if ($('.qty_and_addtocart').length != 0) {
        
        var offsetTop = $('.qty_and_addtocart').offset().top;

        $(window).scroll(function(){

          if($(window).width() < 768 ){

            var windowTop = $(document).scrollTop() + ( $('.qty_and_addtocart').height() - 40 ) ;

            if( windowTop > offsetTop ){
              $(".pro_add_cart.sticky-button").css('display','flex');

              $(".qty_and_addtocart.desktop").css('display','none');

            }else{
              $(".pro_add_cart.sticky-button").css('display','none');

              $(".qty_and_addtocart.desktop").css('display','block');
            }

          }
        }).scroll();
      }

       

    });

}, 2000);

$(document).ready(function() {
  
  	$('.header.big .menu').addClass('visible');

    $('li.brotherhood-reviews4k a ').click(function (e) {

        e.preventDefault();

        $([document.documentElement, document.body]).animate({
            scrollTop: ($("#home_reviews").offset().top) - ($('.topbar_content').height())
        }, 1000);

    });
});

reload_popup = function (show, cart) {};
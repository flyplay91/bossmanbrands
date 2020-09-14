$(document).ready(function(){
  
  $('.accordion > li').hover(function(){
    $('.accordion .drop').removeClass('active');
    $(this).find('.drop').addClass('active');
  }, function(){
    
    $('.accordion .drop').removeClass('active');
  });
  
//   $('body').on('click', '#wrapper', function() {
//     $('.drop').removeClass('active');
//   });
  

  $('.topsellers').slick({
        slidesToShow: 3,
        slidesToScroll: 1,    
        dots: true,
        arrows: true,
    	prevArrow: '<button class="slick-prev"></button>',
		nextArrow: '<button class="slick-next"></button>',
        autoplay: false,
        infinite:false,
        loop: false,
        speed: 500,
        autoplaySpeed: 4000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1.3,
              slidesToScroll: 1,
              centerMode: false,
              centerPadding: '20%',
              infinite: false
            }
          }
         
        ]
   });
   $('.topsellers').show();


   $('.shop-scent-featured-blocks').slick({
    slidesToShow: 4,
     slidesToScroll: 1,    
    dots: true,
    arrows: false,
    autoplay: false,
    infinite:false,
    loop: false,
    speed: 500,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: '20%',
          infinite: false
        }
      }
     
    ]
});
$('.topsellers').show();

	$('.frombrotherhood-slider').on('init', function(event, slick){
	    $('.frombrotherhood-slider.slick-initialized').css({'opacity': '1', 'visibility': 'visible'});
  	});

      var $status = $('.pagingInfo');
      var $slickElement = $('.frombrotherhood-slider');

      $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        $status.html('<span class="next"><</span>' + i + '<span>/</span>' + slick.slideCount + '<span class="prev">></span>')
      });
      $('.frombrotherhood-slider').slick({
        dots: true,
        arrows: false,
        autoplay: false,
        infinite: true,
        speed: 500,
        autoplaySpeed: 8000,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: $('.next'),
        nextArrow: $('.prev'),
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 1000,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
         
        ]
      });
      $('.prev').click(function(){
        $('.frombrotherhood-slider').slick('slickPrev');
      });
      
      $('.next').click(function(){
        $('.frombrotherhood-slider').slick('slickNext');
      });

      
      $('.weekspicks').slick({
        dots: false,
        arrows: false,
        autoplay: false,
        speed: 500,
        autoplaySpeed: 4000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1.3,
              slidesToScroll: 1,
              centerMode: false,
              centerPadding: '20%',
              infinite: false
            }
          }
         
        ]
      });

      $('.blog-categories-slider').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        prevArrow: ".slick-prev",
        nextArrow: ".slick-next",
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '100px',
                    initialSlide: 1,
                    dots: true,
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
    
    
    $('.blog .nav .dropdown-toggler').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.nav').find('.nav-menu').fadeToggle();
    });

    $('.toggle').click(function(e) {
      e.preventDefault();
    
      var $this = $(this);
    
      if ($this.next().hasClass('show')) {
          $this.next().removeClass('show');
          $this.next().slideUp(350);
          $this.parent().find('a.toggle').toggleClass('arrow-down');
      } else {
          $this.parent().parent().find('li .inner').removeClass('show');
          $this.parent().parent().find('li .inner').slideUp(350);
          $this.next().toggleClass('show');
          $this.next().slideToggle(350);
          $this.parent().find('a.toggle').toggleClass('arrow-down');
      }
  });





$("#fourstep-desktop .video1").hover(function(){
    var imgurl = $(this).data("hoverimage");
    $(this).css("background-image", "url(//cdn.shopify.com/s/files/1/2283/7011/files/Step-1-GIF.gif?v=1591207023)")
}, function(){
  var pimgurl = $(this).data("pimage");
  $(this).css("background-image", "url(" + pimgurl + ")")
});

$("#fourstep-desktop .video2").hover(function(){
  var imgurl = $(this).data("hoverimage");
  $(this).css("background-image", "url(//cdn.shopify.com/s/files/1/2283/7011/files/Step-2-GIF.gif?v=1591207038)")
}, function(){
var pimgurl = $(this).data("pimage");
$(this).css("background-image", "url(" + pimgurl + ")")
});

$("#fourstep-desktop .video3").hover(function(){
  var imgurl = $(this).data("hoverimage");
  $(this).css("background-image", "url(https://cdn.shopify.com/s/files/1/2283/7011/files/Step-3-GIF.gif?v=1591207148)")
}, function(){
var pimgurl = $(this).data("pimage");
$(this).css("background-image", "url(" + pimgurl + ")")
});


$("#fourstep-desktop .video4").hover(function(){
  var imgurl = $(this).data("hoverimage");
  $(this).css("background-image", "url(https://cdn.shopify.com/s/files/1/2283/7011/files/Step-4-GIF.gif?v=1591207184)")
}, function(){
var pimgurl = $(this).data("pimage");
$(this).css("background-image", "url(" + pimgurl + ")")
});

$('.article__content--copy').find('h3.hypervisual__text_line_one.hypervisual__text-medium:first').addClass('first-letter');



      
  // $('.hammer-swatch').hover(
  //     function(){$('.scenthover-description').removeClass('active')},
  //     function(){$('.hammer-description').stop().show(100);},
  //     function(){$('.hammer-description').stop().hide(100);}
  // );
  // $('.magic-swatch').hover(
  //     function(){$('.magic-description').stop().fadeIn(100);},
  //     function(){$('.magic-description').stop().fadeOut(100);}
  // );
  // $('.stagecoach-swatch').hover(
  //     function(){$('.stagecoach-description').stop().fadeIn(100);},
  //     function(){$('.stagecoach-description').stop().fadeOut(100);}
  // );
  // $('.gold-swatch').hover(
  //     function(){$('.gold-description').stop().fadeIn(100);},
  //     function(){$('.gold-description').stop().fadeOut(100);}
  // );  
  // $('.naked-swatch').hover(
  //     function(){$('.naked-description').stop().fadeIn(100);},
  //     function(){$('.naked-description').stop().fadeOut(100);}
  // ); 
  // $('.royal-oud-swatch').hover(
  //     function(){$('.royaloud-description').stop().fadeIn(100);},
  //     function(){$('.royaloud-description').stop().fadeOut(100);}
  // );    
  // $('.the-gatsby-swatch').hover(
  //     function(){$('.thegatsby-description').stop().fadeIn(100);},
  //     function(){$('.thegatsby-description').stop().fadeOut(100);}
  // );    
  // $('.vetiver-x-swatch').hover(
  //     function(){$('.vetiverx-description').stop().fadeIn(100);},
  //     function(){$('.vetiverx-description').stop().fadeOut(100);}
  // );
  
  if ($('.swatch_options').length != 0) {

    $('.swatch_options .swatch:first-child .swatch-element').hover(function() {
      selectedVariantVal = $(this).data('value');
      $('.scent-descriptions .scenthover-description.default-active').removeClass('active');

      $('.scent-descriptions .scenthover-description[data-value="' + selectedVariantVal + '"]').addClass('active');
      }, function(){

      $('.scent-descriptions .scenthover-description[data-value="' + selectedVariantVal + '"]').removeClass('active');
      $('.scent-descriptions .scenthover-description.default-active').addClass('active');
      
    });

    $('body').on('click tab touchstart', '.swatch_options .swatch:first-child .swatch-element', function() {
      var selectedVariantVal = $(this).data('value');
      $('.scent-descriptions .scenthover-description').removeClass('active');
      $('.scent-descriptions .scenthover-description').removeClass('default-active');

      $('.scent-descriptions .scenthover-description[data-value="' + selectedVariantVal + '"]').addClass('default-active');
      $('.scent-descriptions .scenthover-description[data-value="' + selectedVariantVal + '"]').addClass('active');

    });
  }


});


// //Blog Js
//   $('.categories-slider').flickity({
//     cellAlign: 'left',
//     contain: true,
//     pageDots: false,
//     prevNextButtons: true,
//     initialIndex: 0,
//     groupCells: 2
// });
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
})

// $('.blog .nav .nav-menu li a').on('click', function (e) {
//     e.preventDefault();
//     if (window.matchMedia("(max-width: 767px)").matches) {
//         $('.blog .nav .nav-menu li').removeClass('active');
//         $(this).parent().addClass('active');
//         $('.nav').find('.nav-title').text($(this).text());
//         $('.nav').find('.nav-menu').fadeToggle();
//     } else {}
// });
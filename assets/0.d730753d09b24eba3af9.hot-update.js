webpackHotUpdate(0,[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$(document).ready(function () {
    $('.btn-hamburger').click(function (e) {
        $(this).toggleClass('active');
        $(this).parent().toggleClass('active');
        $('.hidden-menu_block').toggleClass('active');
        $('.overlay').toggleClass('active');
    });
    $('.overlay').click(function (e) {
        $(this).removeClass('active');
        $('.btn-hamburger').removeClass('active');
        $('.btn-hamburger').parent().removeClass('active');
        $('.hidden-menu_block').removeClass('active');
    });

    $('.main-banner-slick').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false
    });
    $('.partners-slick').slick({
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows: true,
        dots: false
    });
});

/***/ })
])
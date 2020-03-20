webpackHotUpdate(0,[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$('.btn-hamburger').click(function (e) {
    $(this).toggleClass('active');
    $(this).parent().toggleClass('active');
    $('.hidden-menu_block').toggleClass('active');
    $('.overlay').toggleClass('active');
    $('.hidden-search_block').removeClass('active');
});
$('.overlay').click(function (e) {
    $(this).removeClass('active');
    $('.btn-hamburger').removeClass('active');
    $('.btn-hamburger').parent().removeClass('active');
    $('.hidden-menu_block').removeClass('active');
});

/***/ })
])
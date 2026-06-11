// JavaScript Document

jQuery(document).ready(function($) {

    $(".kiosk .slider").royalSlider({
        autoScaleSlider: true,
        autoScaleSliderWidth: 1200,
        autoScaleSliderHeight: 334,
        imageScaleMode: 'fill',
        imageAlignCenter: true,
        imageScalePadding: 0,
        controlNavigation: 'bullets',
        arrowsNav: false,
        imgWidth: 1200,
        imgHeight: 334,
        slidesSpacing: 0,
        loop: true,
        loopRewind: true,
        autoPlay: {
            enabled: true,
            pauseOnHover: true,
            delay: 5000
        },
        numImagesToPreload: 5,
        usePreloader: false,
        transitionType: 'fade',
        navigateByClick: true,
        sliderTouch: true,
        keyboardNavEnabled: true,
        fadeinLoadedSlide: false
    });

    $(".slider").proportionalResize();

    $('td.info').tipsy({gravity: 'n'});

    $('a.zoom').fancybox({
        'padding': 5,
        'overlayColor': '#000',
        'overlayOpacity': '0.6'
    });

    $('a.dealerinfo').fancybox({
        'padding': 5,
        'autoDimensions': false,
        'width': 500,
        'height': 'auto',
        'overlayColor': '#000',
        'overlayOpacity': '0.6'
    });

    $(".popup").fancybox({
        maxWidth: 800,
        maxHeight: 600,
        fitToView: false,
        width: '70%',
        height: '70%',
        autoSize: false,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none'
    });

});

$(window).load(function(){
    $(".first .graph div.content").mCustomScrollbar();
    $(".second section.box div.content").mCustomScrollbar();
});

/* jshint devel:true */

$(function () {
    'use strict';

    var $filterButton = $('.js-filter-button'),
        $gridItem = $('.grid-item'),
        $slider = $('.js-slider'),
        $grid = $('.js-grid'),
        $imagePopupButton = $('.js-image-popup-btn'),
        $videoPopupButton = $('.js-video-popup-btn');

    $grid.isotope({
        // options
        itemSelector: '.grid-item',
        layoutMode: 'packery',
        packery: {
            gutter: 20
        }
    });

    $slider.slick({
        lazyLoad: 'progressive',
        fade: true,
        cssEase: 'linear',
        prevArrow: '<button type="button" class="slider-prev"></button>',
        nextArrow: '<button type="button" class="slider-next"></button>'
    });

    $imagePopupButton.magnificPopup({ 
      type: 'image',
      closeMarkup: '<button title="%title%" class="mfp-close"><i class="mfp-close-icn"></i></button>'
    });

    $videoPopupButton.magnificPopup({ 
      type: 'iframe',
      closeMarkup: '<button title="%title%" class="mfp-close"><i class="mfp-close-icn"></i></button>'
  });

    $('body').on('click', '.mfp-close-icn', function(e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

    $filterButton.on('click', function(e) {
        e.preventDefault();

        var that = $(this),
            thisFilter = that.data('filter');

        if(that.hasClass('_active')) {
            return;
        } else {
            $filterButton.removeClass('_active');
            that.addClass('_active');

            filtering($gridItem, thisFilter);
        }
    });

    /////////////////////////

    function filtering(target, filter) {
        $(target).removeClass('_passive');

        if(filter === 'all') { return false; }

        for (var i = 0, l = target.length; i < l; i++) {

            var catArr = $(target[i]).data('category').split(' '),
                count = 0;

            for (var j = 0, x = catArr.length; j < x; j++) {
                if(catArr[j] === filter) {
                    count++;
                }
            }

            if(count === 0) {
                $(target[i]).addClass('_passive');
            }
        }
    }
});

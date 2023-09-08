jQuery.noConflict();

jQuery(window).on('load',function() { 
    //Trigger layout after each image loads and initialise Mansonry
    // jQuery('.waterfall_area').imagesLoaded(function($) {
        jQuery('.waterfall_area').masonry({
        itemSelector: '.contentbox',
        columnWidth: 23, //gap
        animate: true,
        horizontalOrder: true,
        originTop: true
        });
    // });
  
          //Fade Out the loading screen when all images loaded
    //       jQuery('.waterfall_area').imagesLoaded().always( function( instance ) {
    //         jQuery('.loadingScreen').fadeOut();
    // })
    });
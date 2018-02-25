// =============================================================================
//  Background Image
//  =================
//  Function that applies the first image to the background of the element with options
//  -----------------
/*

  element: class to target
  options: background options
  hide: 1 for <img> only, 2 for entire .image div

  examples:
  backgroundImage($(".has-bg"), "center center / cover no-repeat", 2);
  backgroundImage($(".has-bg__collection li"), "center center / cover no-repeat", 2);
  backgroundImage($(".has-bg-li__collection li .collection-item-image"), "center center / cover no-repeat", 1);

*/
//  -----------------
// ==============================================================================
function backgroundImage(element, options, hide) {
	$( element ).each(function() {
    var imgSrc = $(this).find('img').first().attr('src');

    if ( hide == 1 ) {
      $(this).find('img').first('img').hide();
    }
    else {
      $(this).find('img').parent('.image, .spotlight-image').hide();
    }

    $(this).css('background', 'url('+imgSrc+')' + options);
 });
}
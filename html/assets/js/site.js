// =============================================================================
//	Imports
// =============================================================================
//= include components/updatevalue.js
//= include components/backgroundImage.js
//= include components/bodyClassToggler.js
//= include components/accordianMenu.js
//= include components/navChecker.js
//= include components/textWrapper.js

// function scrollr() {
//   var scrollTop = $(window).scrollTop();
//   var parallaxImg = $('.divider_section .wrap').height();
//   var bH = $('body').height();

//   var temp = Math.ceil(bH / (parallaxImg/1.5) + 2);

//   console.log(parallaxImg);
//   console.log(bH);
//   console.log(temp);

//   var y = Math.ceil(scrollTop / (temp) );
//   var coords = '50% '+ -y + 'px';
//   $('.divider_section .wrap').css({ backgroundPosition: coords });
// }


$(document).ready(function() {

  // jumplink stuff
  $('header a').on('click', function(e) {
    e.preventDefault();
    $(this.hash).velocity('scroll', {delay: 0, duration: 1100, offset: -90});
  });
  $(window.location.hash).velocity('scroll', {delay: 0, duration: 1100, offset: -90});


      //inside document ready
      var elementTop = $('.end-info').offset().top;
      $(window).scroll(function() {
        if( $(window).scrollTop() > elementTop ) {
          $('body').addClass('image-hidden');
        } else {
          $('body').removeClass('image-hidden');
        }
          // scrollr();
        });

}); // end document ready
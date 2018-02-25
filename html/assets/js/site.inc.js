// =============================================================================
//	Imports
// =============================================================================
/* Function that updates the value field of text inputs */
function updateValue(input, text) {
	input.val(text);

	if(input.val() === null) {
		input.val(text);
	}
	input.focus(function() {
		if(input.val() === text) {
			input.val("");
		}
	});
	input.blur(function() {
		if(input.val() === null || input.val() === "") {
			input.val(text);
		}
	});
}

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

// =============================================================================
//  Body Class Toggler
//  =================
//  function that takes an element and applies a class when clicked
//  -----------------
//  example:
//  bodyClassToggler('mobile_menu', 'mobile_menu_is_visible');
//  -----------------
// ==============================================================================
function bodyClassToggler(element, elemClass){
	$(element).on('click', function(){
		$('body').toggleClass(elemClass);
	});
}

// ================================================================================================
//  Accordian Menu
//  =================
//  applies accordian functionality to any nav with class accordian
// ================================================================================================
$(document).ready(function() {

	if( $('nav.accordian').length > 0 ) {

		$('nav.accordian').find('ul').children('li').has('ul').each(function() {
			$(this).children('a').append('<span class="accordian_toggle"></span>');
			if( $(this).hasClass('nav__list--here') ) {
				$(this).addClass('accordian_open');
				$(this).closest('li').children('ul').slideDown();
			}
		});

		$('span.accordian_toggle').click(function(n) {
			n.preventDefault();
			if (!$(this).closest('li').hasClass('accordian_open')) {
				$(this).closest('li').siblings().removeClass('accordian_open').children('ul').slideUp();
				$(this).closest('li').addClass('accordian_open');
				$(this).closest('li').children('ul').slideDown();
			} else {
				$(this).closest('li').removeClass('accordian_open').children('ul').slideUp();
			}
		});

	}

});

// =============================================================================
// Nav Checker
// =============
// get the combined widths of mutlitple elements and 
// check to see if it is greater than the containers width
// =============================================================================

      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // call function outside of $(document).ready
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      // examples
      //========================================
      // $('header .wrap').navChecker({
      //   activeClass: 'added-class',
      //   children: [$('nav.dropdown > ul > li')],
      //   targets: [$('body'), $('.search-block')],
      // });
      //========================================

      // default settings
      //========================================      
      // $('header .wrap').navChecker();
      //========================================

// =============================================================================
// activeClass: the class that is added to 'targets', default "desktop-nav-is-too-wide"
// children: array of jquery elements to calc widths, defaults to all direct children
// targets: array of jquery elements that 'activeClass' is applied
// =============================================================================

(function ($, window, document, undefined) {
  var pluginName = 'navChecker';

  function NavChecker(el, options, sel) {
    this.$el = $(el);
    this.selector = sel;
    
    var defaults = {
      activeClass: 'desktop-nav-is-too-wide',
      children: [],
      childrenWidth: 0,
      targets: [$('body')]
    };

    this.options = $.extend({}, defaults, options);

    this.init();
  }


  NavChecker.prototype = {

        // Initialize children and events
        init: function () {
          var plugin = this;

          // If children are not set, get this elements direct children'
          if (plugin.options.children.length === 0) {
            plugin.options.children.push(plugin.$el.children());
          }

          plugin.initEvents();
          plugin.checkSize();
        },

        // Events here
        initEvents: function () {
          var plugin = this;

          $(window).resize(function () {
            plugin.checkSize();
          });
          $(window).load(function(){
            plugin.checkSize();
          });
          $(document).ready(function(){
            plugin.getChildren();
            plugin.checkSize();
          });
        },

        // add all children widths together
        getChildren: function () {
          var plugin = this;
          plugin.options.childrenWidth = 0;

          $.each(plugin.options.children, function (index, child) {
            child.each(function () {
              plugin.options.childrenWidth += $(this).outerWidth();
            });
          });
        },

        // run comparison of childrenWidth and containerWidth
        checkSize: function () {
          var plugin = this;
          var containerWidth = plugin.$el.width();
          
          if (plugin.options.childrenWidth >= containerWidth) {
            plugin.updateClasses('add');
          } else {
            plugin.updateClasses('remove');
          }
        },

        // Add or remove 'activeClass' to 'targets'
        updateClasses: function (operation) {
          var plugin = this;

          $.each(plugin.options.targets, function (index, target) {
            if (operation == 'remove') {
              target.removeClass(plugin.options.activeClass);
            } else {
              target.addClass(plugin.options.activeClass);
            }
          });
        }

      };

      $.fn[pluginName] = function (options) {
        var sel = this.selector;
        return this.each(function () {
          if (!$.data(this, pluginName)) {
            $.data(this, pluginName, new NavChecker(this, options, sel));
          }
        });
      };

    })(jQuery, window, document);

//textWrapper
// wraps text in div with class name

// example
// textWrapper($(".testimonial-container"), ".collection-item-description", "*", "collection-item-quote");
//

function textWrapper(targetContainer, target, separator, wrapClass ) {
  $(targetContainer).each(function() {
    $(this).find(target).html(function (i, html) {
      if ( $(this).text().indexOf(separator) >= 0 ){
        splitText = $(this).text().split(separator);
        formattedText =  splitText[0] + '<span class="'+wrapClass+'">' + splitText[1] + "</span>" ;
        $(this).html(formattedText);
      }  
    }); 
  });
}


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
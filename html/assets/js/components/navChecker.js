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
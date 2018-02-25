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
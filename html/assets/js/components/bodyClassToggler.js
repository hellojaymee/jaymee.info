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
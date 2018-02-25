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
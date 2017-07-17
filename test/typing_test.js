(function($) {
	"use strict";
	
	module("typing");
	test("accepts keys in sequence", function() {
		var input = $("#input1").maskMoney();
		input.trigger("focus");
		keypress(input, 1);
		keypress(input, 2);
		keypress(input, 3);
		keypress(input, 4);
		keypress(input, 5);
		keypress(input, 6);

		strictEqual(input.val(), "1,234.56", "accept the input and format correctly");
	});

	test("with a suffix", function() {
		var input = $("#input1").maskMoney({suffix: " €"});
		input.trigger("focus");
		keypress(input, 1);
		keypress(input, 2);
		keypress(input, 3);
		keypress(input, 4);
		keypress(input, 5);

		strictEqual(input.val(), "123.45 €", "accept the input and format correctly");
	});
	
	test("with a pre-set value", function() {
		var input = $("#input1").maskMoney({precision:2});				
		input.focus().val("1");
		input.trigger("focus");
		strictEqual(input.val(), "1.00", "accept the input and format correctly");
	});
}(jQuery));
define(function(require, exports, module) {
	
	var $ = require('jquery'),
		Backbone = require('backbone');

	var AppCanvas = Backbone.View.extend({

		
		el: "#app-canvas",


	});


	var appCanvas = window.appCanvas = new AppCanvas();

});
define(function(require, exports, module) {
	
	var $ = require('jquery'),
		Backbone = require('backbone');

	var AddView = Backbone.View.extend({

		el: "#app-add",

		initialize: function() {
			var me = this;

			// 页面中常用的jQuery对象集合
			me.$collection = {
				$todoTitle : me.$('#todo-title'),
				$todoTag : me.$('#todo-tag'),
				$todoStar : me.$("#todo-star")
			}
		},

		events : {
			"click #todo-add" : "add"
		},

		add: function() {
			var me = this,
				$collection = me.$collection;

			$.ajax({
				url: '/api/addTodo',
				type: 'POST',
				data: {
					title: $collection.$todoTitle.val(),
					tag: $collection.$todoTag.val(),
					star: $collection.$todoStar[0].checked
				},
				dataType: 'json',
				timeout: 30000,
				success: function(data, textStatus, jqXHR) {
					if(data.resultCode === 0) {
						window.location.replace('/todos');
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {

				}
			});

			return false;
		}

	});

	var appAdd = new AddView();

});
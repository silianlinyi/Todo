define(function(require, exports, module) {
	var $ = require('jquery'),
		Backbone = require('backbone');

	/**
	 * Model Todo
	 * ------------------------------------------------------
	 */
	var Todo = Backbone.Model.extend({
		_id 	: '',
		title	: '',
		tag	: '',
		star	: false,
		user	: ''
	});

	/**
	 * Collection TodoList
	 * ------------------------------------------------------
	 */
	var TodoList = Backbone.Collection.extend({

		model: Todo,

		filterByStar: function() {
			return this.where({star:true});
		},

		filterByMark: function(markValue) {
			return this.where({tag: markValue});
		},

		getAllTags: function() {
			return _.uniq(this.pluck("tag"));
		}
	});

	/**
	 * View TodoAppView
	 * ------------------------------------------------------
	 */
	var TodoAppView = Backbone.View.extend({

		el: "#todo-app",

		events: {

		},

		initialize: function() {
			this.todoList = new TodoList();
			this.filterTodos();
		},

		/**
		 * @method filterTodos
		 * 根据传入的参数不同，来获取todo项
		 * 
		 * @param  {Object} data
		 */
		filterTodos: function(data) {
			var me = this;
			$.ajax({
				url: '/filterTodos',
				type: 'GET',
				data: data,
				success: function(data, textStatus, jqXHR) {
					console.log(data.forEach(function(item) {
						console.log(item);
					}));
					me.todoList.add(data);
				},
				error: function(jqXHR, textStatus, errorThrown) {}
			});
		}

		

	});

	var globalNamespace = window.globalNamespace = {};

	globalNamespace.todoAppView = new TodoAppView();

});
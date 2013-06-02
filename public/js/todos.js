define(function(require, exports, module) {
	
	var $ = require('jquery'),
		Backbone = require('backbone');

	/**
	 * Model Todo
	 * ------------------------------------------------------
	 */
	var Todo = Backbone.Model.extend({

		defaults: {
			_id: "",
			star: false,
			tag: "",
			title: "",
			user: "",
			done: false
		}
		
	});

	/**
	 * Collection TodoList
	 * ------------------------------------------------------
	 */
	var TodoList = Backbone.Collection.extend({
		model: Todo
	});

	/**
	 * View Todo
	 * ------------------------------------------------------
	 */
	var TodoView = Backbone.View.extend({

		tagName: "tr",

		className: "animated fadeIn",

		template: 	'<td><%= _id %></td>' +
					'<td><%= star %></td>' +
					'<td><%= tag %></td>' +
					'<td><%= title %></td>' +
					'<td><%= user %></td>' +
					'<td><%= done %></td>' +
					'<td><a href="#" class="btn btn-block btn-primary">编辑</a></td>' +
					'<td><a href="#" class="btn btn-block btn-danger">删除</a></td>',

		events: {

		},

		initialize: function() {

		},

		render: function() {
			var me = this,
				tmpl = _.template(me.template);

			me.$el.html(tmpl(me.model.toJSON()));

			return this;
		}

	});

	/**
	 * View TodoAppView
	 * ------------------------------------------------------
	 */
	var TodoAppView = Backbone.View.extend({

		el: "#todos-app",

		events: {

		},

		initialize: function() {

			this.$todosList = this.$(".todos-list");

			this.todoList = new TodoList();
			this.todoList.on("add", this.renderTodoItem, this);

			this.filterTodos();

		},

		renderTodoList: function() {
			var me = this;
			if(me.todoList.length === 0) {

			} else {
				_.each(me.todoList.models, function(item) {
					me.renderTodoItem(item);
				}, me);
			}
		},

		renderTodoItem: function(item) {
			var view = new TodoView({
				model: item
			});

			this.$todosList.append(view.render().el);
		},

		/**
		 * @method filterTodos
		 * 根据传入的参数不同，来获取todo项
		 */
		filterTodos: function(data) {
			var me = this;
			$.ajax({
				url: '/api/filterTodos',
				type: 'GET',
				data: data,
				success: function(data, textStatus, jqXHR) {
					data.forEach(function(todo) {
						me.todoList.add(new Todo(todo));
					});
					
				},
				error: function(jqXHR, textStatus, errorThrown) {}
			});
		}

	});

	var todoApp = window.todoApp = {};

	todoApp.todoAppView = new TodoAppView();



});
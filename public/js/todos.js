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
			user_id: "",
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
					'<td><%= user_id %></td>' +
					'<td><%= done %></td>' +
					'<td><a href="#" class="btn btn-primary btn-edit">编辑</a></td>' +
					'<td><a href="#" class="btn btn-danger btn-delete">删除</a></td>',

		events: {
			"click .btn-edit" 	: "editTodo",
			"click .btn-delete" : "deleteTodo"
		},

		initialize: function() {

			// when a model's attributes have changed.
			this.listenTo(this.model, 'change', this.render);

			// when a model is removed from a collection.
            this.listenTo(this.model, 'remove', this.remove);
		},

		render: function() {
			var me = this,
				tmpl = _.template(me.template);

			me.$el.html(tmpl(me.model.toJSON()));
			return this;
		},

		editTodo: function() {

		},

		/**
		 * @method deleteTodo
		 * 删除某一条Todo项
		 */
		deleteTodo: function() {
			var me = this;

			$.ajax({
				url: "/api/deleteTodo",
				type: "POST",
				data: me.model.toJSON(),
				dataType: 'json',
				timeout: 30000,
				success: function(data, textStatus, jqXHR) {
					if(data.resultCode === 0) {
						me.model.collection.remove(me.model);//从Collection中删除模型
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {

				}
			})
		}

	});

	/**
	 * View TodoAppView
	 * ------------------------------------------------------
	 */
	var TodoAppView = Backbone.View.extend({

		el: "#app-todos",

		events: {

		},

		initialize: function() {

			var me = this;

			me.$collection = {
				$todosList: me.$(".todos-list")
			};

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

			this.$collection.$todosList.append(view.render().el);
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

	var appTodos = window.appTodos = new TodoAppView();



});
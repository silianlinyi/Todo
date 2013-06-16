/**
 * [exports description]
 * @type {Object}
 */
module.exports = {

	/**
	 * @method index
	 * 渲染index页面
	 */
	index: function(req, res) {
		if ( !! req.session.username) {
			res.render('index', {
				title: "Todo Application",
				hasLogin: true,
				username: req.session.username
			});
		} else {
			res.redirect('/login');
		}
	},

	/**
	 * @method login
	 * 跳转到登录页面
	 */
	login: function(req, res) {
		res.render('login', {
			title: "登录 - Todo Application",
			hasLogin: false
		});
	},

	/**
	 * @method signup
	 * 跳转到注册页面
	 */
	signup: function(req, res) {
		res.render('signup', {
			title: "注册 - Todo Application",
			hasLogin: false
		});
	},

	todos: function(req, res) {
		// 用户登录了
		if ( !! req.session.username) {
			res.render('todos', {
				title: "Todos List",
				hasLogin: true,
				username: req.session.username
			});
		} else { // 用户没有登录
			res.redirect('/login');
		}
	},

	add: function(req, res) {
		if ( !! req.session.username) {
			res.render('add', {
				title: "Add A Todo",
				hasLogin: true,
				username: req.session.username
			});
		} else {
			res.redirect('/login');
		}
	}




}
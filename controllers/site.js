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
		res.render('index', {
			title: "Todo Application",
			hasLogin: !! req.session.loginName,
		});
	},

	/**
	 * @method login
	 * 跳转到登录页面
	 */
	login: function(req, res) {
		res.render('login', {
			hasLogin: !! req.session.loginName,
			title: "登录 - Todo Application"
		});
	},

	/**
	 * @method signup
	 * 跳转到注册页面
	 */
	signup: function(req, res) {
		res.render('signup', {
			hasLogin: !! req.session.loginName,
			title: "注册 - Todo Application"
		});
	},

	todos: function(req, res) {
		// 用户登录了
		if ( !! req.session.loginName) {
			res.render('todos', {
				title: "Todos List",
				hasLogin: true,
			});
		} else { // 用户没有登录
			res.redirect('/login');
		}
	}


}
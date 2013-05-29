var site = require('./controllers/site');
	sign = require('./controllers/sign');

module.exports = function(app) {

	app.get('/', site.index);
	app.get('/signup', sign.signup);
	app.get('/login', sign.login);
	app.get('/todos', site.todos);

	// GET
	app.get('/api/filterTodos', site.filterTodos);
	app.get('/api/getAllTags', site.getAllTags);
	app.get('/api/filterTodos/star', site.star);
	app.get('/api/filterTodos/unStar', site.unStar);
	app.get('/api/loginOut', sign.loginOut);


	// POST
	app.post('/api/addTodo', site.addTodo);
	app.post('/api/loginIn', sign.loginIn);

}
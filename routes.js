var site = require('./controllers/site'),
	API = require('./controllers/API');

module.exports = function(app) {

	app.get('/', site.index);
	app.get('/signup', site.signup);
	app.get('/login', site.login);
	app.get('/todos', site.todos);
	app.get('/add', site.add);

	/**
	 * 以下为公共的GET API
	 */
	app.get('/api/filterTodos', API.filterTodos);
	app.get('/api/getAllTags', API.getAllTags);
	app.get('/api/filterTodos/star', API.star);
	app.get('/api/filterTodos/unStar', API.unStar);
	app.get('/api/loginOut', API.loginOut);

	/**
	 * 以下为公共的POST API
	 */
	app.post('/api/loginIn', API.loginIn);
	app.post('/api/signup', API.signup);
	app.post('/api/addTodo', API.addTodo);
	app.post('/api/deleteTodo', API.deleteTodo);

	

}
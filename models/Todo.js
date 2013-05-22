var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TodoSchema = new Schema({
	title: String,
	user: String,
	star: Boolean,
	mark: String
});
mongoose.model('Todo', TodoSchema);


var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//create schema for Todo
var UserSchema = new Schema({
	username: '',
	password: ''
});

/**
 * compile schema to model
 */
module.exports = mongoose.model('User', UserSchema, 'users');
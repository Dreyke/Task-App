var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//define a schema - what fields a task document have
var taskSchema = new Schema({
    text: String,
    completed: Boolean
});

// compile taskSchema description into a Mongoose model with the name 'task'
var Task = mongoose.model('Task', taskSchema);

//Export the task model for use in the application
module.exports = Task;
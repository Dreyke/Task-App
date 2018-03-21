var express = require('express');
var router = express.Router();
var Task = require('../models/tasks');

/* GET home page. */
router.get('/', function(req, res, next) {

  Task.find( {completed: false} )
      .then( (docs) => {
        res.render('index', {title: 'Incomplete tasks', tasks: docs} );
      })
      .catch( (err) => {
        next(err);
      });
});

/* POST to create a new task */
router.post('/add', function(req, res, next){
    // check for text input
    if (req.body.text) {
        //Create new task
        var t = new Task({text: req.body.text, completed: false})
        // save the task, and redirect to home if successful
        t.save().then((newTask) => {
            console.log('The new task created is ', newTask);
            res.redirect('/'); //Creates a GET request to '/'
        }).catch(() => {
            next(err); // forward error to the error handlers
        });
    }
    else {
        res.redirect('/'); //else, ignore and redirect to home page.
    }
    });

/* POST to mark a task as done */
router.post('/done', function (req, res, next) {

    Task.findByIdAndUpdate( req.body._id, {completed: true})
        .then( (originalTask) => {
            // originalTask only has a value if document with this _id was found
            if (originalTask) {
                res.redirect('/');
            } else {
                var err = new Error('Not Found');
                err.status = 404; // report task not found with 404 status
                next(err);
            }
        })
        .catch( (err) => {
            next(err); // to error handlers
        });
});

/* GET completed tasks */
router.get('/completed', function(req, res, next){

    Task.find({completed: true})
        .then( (docs) => {
            res.render('completed_tasks', {title: 'Completed tasks', tasks: docs });
        }).catch( (err) => {
            next(err);
    });
});

/* POST to delete a task */
router.post('/delete', function (req, res, next) {

    Task.findByIdAndRemove(req.body._id)
        .then( (deletedTask) => {
            if (deletedTask) {
                res.redirect('/');
            } else {
                var error = new Error('Task not found');
                error.status = 404;
                next(error);
            }
        }) .catch( (err) => {
            next(err);
    })
});

/* POST mark all tasks as done */
router.post('/alldone', function (req, res, next) {

    Task.updateMany({completed: false}, {completed: true})
        .then( () => {
            res.redirect('/');
        }) .catch( (err) => {
            next(err);
    });
});

/* GET details about one task */
// important note for future ref:
// a semicolon in a route path for a handler is used to create a wildcard
// matches any route with that pattern
router.get('/task/:_id', function (req, res, next) {

    Task.findById(req.params._id)
        .then( (doc) => {
            if (doc) {
                res.render('task', {task: doc});
            } else {
                next();
            }
        }) .catch( (err) => {
            next(err);
    });
});

/* POST delete all completed tasks */
/* When delete completed tasks button is clicked, this deletes all completed tasks
 * and redirects to the tasks to do page */
router.post('/deleteDone', function (req, res, next) {

    Task.deleteMany({completed: true})
        .then( () => {
            res.redirect('/');
        }) .catch( (err) => {
            next(err);
    });
});

module.exports = router;

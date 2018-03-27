// function to confirm with the user if they want to delete all tasks on the
// completed tasks page.

var deleteConfirmation = document.querySelectorAll(".delete-button"); // selects delete button class

deleteConfirmation.forEach(function (button) {

    // event listener for mouse click
    button.addEventListener('click', function (ev) {

        // confirmation message for user
        var deleteConfirm = confirm('Are you sure?');

        // if user clicks cancel, does not delete task
        if (!deleteConfirm) {
            ev.preventDefault();
        }
    })
});


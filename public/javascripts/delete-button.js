// function to confirm with the user if they want to delete all tasks on the
// completed tasks page.
$(function () {

    $('.delete-done-button').click(function (e) {
        var okDelete = confirm("Test");

        if (!okDelete) {
            e.preventDefault();
        }
    })
});



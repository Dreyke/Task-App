// function to confirm with the user if they want to delete all tasks on the
// completed tasks page.
//$(function () {

  //  $('.delete-done-button').click(function (e) {
    //    var okDelete = confirm("Test");

      //  if (!okDelete) {
          //  e.preventDefault();
        //}
    //})
//});

var deleteButtons = document.querySelectorAll(".delete-button");

deleteButtons.forEach(function (button) {

    button.addEventListener('click', function (ev) {

        var okDelete = confirm('Are you sure?');

        if (!okDelete) {
            ev.preventDefault();
        }
    })
});

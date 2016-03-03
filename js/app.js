// App logic.
window.myApp = {};

ons.ready(function() {
  // Each page calls its own initialization controller.
  document.body.addEventListener('init', function(event) {
    var page = event.target;

    if (myApp.controllers.hasOwnProperty(page.id)) {
      myApp.controllers[page.id](page);
    }
  });
});

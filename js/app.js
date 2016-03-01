// Set up some shortcuts.
window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);

// Our app logic.
window.myApp = {};

ons.ready(function() {
  // Each page calls its own initialization controller.
	$('#myNavigator').addEventListener('init', function(event) {
		var page = event.target;

    if (myApp.controllers.hasOwnProperty(page.id)) {
      myApp.controllers[page.id](page);
    }
	});
});

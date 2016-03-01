/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/

myApp.controllers = {

  //////////////////////////
  // Tabbar Page Controller //
  //////////////////////////
  tabbarPage: function(page) {
    // Set button functionality to open/close the menu.
    page.querySelector('.menu-button').onclick = function() {
      $('#mySplitter').toggleLeft();
    };

    // Set button functionality to push 'new_task.html' page.
    page.querySelector('.new-task-button').onclick = function() {
      $('#myNavigator').pushPage('html/new_task.html');
    };

    // Change tabbar animation depending on platform.
    page.querySelector('#myTabbar').setAttribute('animation', ons.platform.isAndroid() ? 'slide' : 'none');
  },

  //////////////////////////
  // Peding Page Controller //
  //////////////////////////
  pendingTasksPage: function(page) {
    var list = page.querySelector('#pending-tasks');

    // Fill the list with initial data.
    myApp.services.fixtures.forEach(function(data) {
      myApp.services.tasks.create(data);
    });
  },

  ////////////////////////
  // Menu Page Controller //
  ////////////////////////
  menuPage: function(page) {
      // Set functionality for 'No Category' and 'All' default categories respectively.
      myApp.services.categories.bindOnCheckboxChange(page.querySelector('#default-category-list ons-list-item[category-id=""]'));
      myApp.services.categories.bindOnCheckboxChange(page.querySelector('#default-category-list ons-list-item:not([category-id])'));
  },

  ////////////////////////////
  // New Task Page Controller //
  ////////////////////////////
  newTaskPage: function(page) {
    // Set button functionality to save a new task.
    page.querySelector('.save-task-button').onclick = function() {
      var newTitle = page.querySelector('#title-input').value;

      if (newTitle) {
        // If input title is not empty, create a new task.
        myApp.services.tasks.create(
          {
            title: newTitle,
            category: page.querySelector('#category-input').value,
            description: page.querySelector('#description-input').value,
            highlight: page.querySelector('#highlight-input').checked,
            urgent: page.querySelector('#urgent-input').checked
          }
        );

        // Set selected category to 'All', refresh and pop page.
        $('#menuPage ons-list-item ons-input').checked = true;
        $('#menuPage ons-list-item').updateCategoryView();
        $('#myNavigator').popPage();

      } else {
        // Show alert if the input title is empty.
        ons.notification.alert('You must provide a task title.');
      }
    };
  },

  ////////////////////////////////
  // Details Task Page Controller //
  ///////////////////////////////
  detailsTaskPage: function(page) {
    // Get the element passed as argument to pushPage.
    var element = $('#myNavigator').getCurrentPage().options.data.element;

    // Fill the view with the stored data.
    page.querySelector('#title-input').value = element.data.title;
    page.querySelector('#category-input').value = element.data.category;
    page.querySelector('#description-input').value = element.data.description;
    page.querySelector('#highlight-input').checked = element.data.highlight;
    page.querySelector('#urgent-input').checked = element.data.urgent;

    // Set button functionality to save an existing task.
    page.querySelector('.save-task-button').onclick = function() {
      var newTitle = page.querySelector('#title-input').value;

      if (newTitle) {
        // If input title is not empty, ask for confirmation before saving.
        ons.notification.confirm(
          {
            title: 'Save changes?',
            message: 'Previous data will be overwritten.',
            buttonLabels: ['Discard', 'Save']
          }
        ).then(function(buttonIndex) {
          if (buttonIndex === 1) {
            // If 'Save' button was pressed, overwrite the task.
            myApp.services.tasks.update(element,
              {
                title: newTitle,
                category: page.querySelector('#category-input').value,
                description: page.querySelector('#description-input').value,
                ugent: element.data.urgent,
                highlight: page.querySelector('#highlight-input').checked
              }
            );

            // Set selected category to 'All', refresh and pop page.
            $('#menuPage ons-list-item ons-input').checked = true;
            $('#menuPage ons-list-item').updateCategoryView();
            $('#myNavigator').popPage();
          }
        });

      } else {
        // Show alert if the input title is empty.
        ons.notification.alert('You must provide a task title.');
      }
    };
  }
};

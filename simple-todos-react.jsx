// defining a collection to hold our tasks
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient){
	Accounts.ui.config({
		requestPermissions: {
			// facebook: ['user_likes']
		},
		requestOfflineToken: {
			// google: true
		},
		passwordSignupFields: 'USERNAME_ONLY' //  One of 'USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL', 'USERNAME_ONLY', or 'EMAIL_ONLY' (default).
	});

  Meteor.startup(function(){
    // use meteor.startup to render the component after the page is ready
    React.render(<App />, document.getElementById('render-target'));
  });
}
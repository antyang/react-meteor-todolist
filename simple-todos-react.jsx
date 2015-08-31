// defining a collection to hold our tasks
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient){
	Accounts.ui.config({
		// requestPermissions: {
		// 	// facebook: ['user_likes']
		// },
		// requestOfflineToken: {
		// 	// google: true
		// },
		passwordSignupFields: 'USERNAME_ONLY' //  One of 'USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL', 'USERNAME_ONLY', or 'EMAIL_ONLY' (default).
	});

	Meteor.subscribe("tasks");

  Meteor.startup(function(){
    // use meteor.startup to render the component after the page is ready
    React.render(<App />, document.getElementById('render-target'));
  });
}

if (Meteor.isServer){
	Meteor.publish("tasks", function() {
		return Tasks.find({
			$or: [
				{ private: {$ne: true} },
				{ owner: this.userId }
			]
		});
	});
}

// METHOD TIME, for security
Meteor.methods({
	addTask(text){
		// make sure the user is logged in before inserting a task
		if (! Meteor.userId()){
			throw new Meteor.Error("not-authorized");
		}

		Tasks.insert({
			text: text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		})
	},

	removeTask(taskId){
		const task = Tasks.findOne(taskId);
    		if (task.private && task.owner !== Meteor.userId()) {
      	// If the task is private, make sure only the owner can delete it
      	throw new Meteor.Error("not-authorized");
	    }
		Tasks.remove(taskId);
	},

	setChecked(taskId, setChecked){
		const task = Tasks.findOne(taskId);
    		if (task.private && task.owner !== Meteor.userId()) {
      	// If the task is private, make sure only the owner can delete it
      	throw new Meteor.Error("not-authorized");
	    }
		Tasks.update(taskId, {$set: { checked: setChecked } });
	},

	setPrivate(taskId, setToPrivate){
		const task = Tasks.findOne(taskId);

		// make sure only the task owner can make task private
		if (task.owner !== Meteor.userId()){
			throw new Meteor.Error("not-authorized");
		}

		Tasks.update(taskId, {$set: {private: setToPrivate } });
	}
});
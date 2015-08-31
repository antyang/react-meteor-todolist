App = React.createClass({

	// this mixins makes the getMeteorData method work
	mixins: [ReactMeteorData],
	
	getInitialState(){
		return {
			hideCompleted: false
		}
	},

	// loads items from the Tasks collection and puts them on this.data.tasks
	getMeteorData(){
		let query = {};

		if (this.state.hideCompleted){
			// if hideCompleted is checked, filter tasks
			query = { checked: {$ne: true} };
		}
		return {
			tasks: Tasks.find(query, {sort: {createdAt: -1} }).fetch(),
			incompleteCount: Tasks.find( { checked: {$ne: true} } ).count(),
			currentUser: Meteor.user()
		};
	},


	/* Hardedcode Dummydata
	getTasks(){
		return [
		{_id: 1, text: 'This is task 1'},
		{_id: 2, text: 'This is task 2'},
		{_id: 3, text: 'This is task 3'},
		]
	},
	*/

	renderTasks(){
		return /**this.getTasks().map*/this.data.tasks.map((task) => {
			return <Task key={ task._id } task ={ task } />
		});
	},

	handleSubmit(event){
		event.preventDefault();

		// find the text field via the React ref
		var text = React.findDOMNode(this.refs.textInput).value.trim();

		// inserting into collection
		Tasks.insert({
			text: text,
			createdAt: new Date(), 					// current time
			owner: Meteor.userId(),					// _id of logged in user
			username: Meteor.user().username 	// username of logged in user
		});

		// clear form
		React.findDOMNode(this.refs.textInput).value = "";
	},

	// hide function
	toggleHideCompleted(){
		this.setState({
			hideCompleted: ! this.state.hideCompleted
		})
	},

	render: function(){
		return (
				<div className="container">
					<header>
						<h1>Todo List ({this.data.incompleteCount})</h1>
						
						<label className="hide-completed">
							<input 
								type="checkbox"
								readOnly={true}
								checked={this.state.hideCompleted}
								onClick={this.toggleHideCompleted}/>
							Hide Completed Tasks
						</label>

						<AccountsUIWrapper/> Welcome { this.data.currentUser.username }

						{ this.data.currentUser ?
						<form onSubmit={ this.handleSubmit } className="new-task">
							<input 
								type="text" 
								ref="textInput" 
								placeholder="Type to add new tasks" />
						</form> : ""
						}

					</header>


					<ul>
						{ this.renderTasks() }
					</ul>
				</div>
			);
	}
})
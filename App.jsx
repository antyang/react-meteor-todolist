App = React.createClass({

	// this mixins makes the getMeteorData method work
	mixins: [ReactMeteorData],
	
	// loads items from the Tasks collection and puts them on this.data.tasks
	getMeteorData(){
		return {
			tasks: Tasks.find({}, {sort: {createdAt: -1} }).fetch()
		}
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
			createdAt: new Date() // current time
		});

		// clear form
		React.findDOMNode(this.refs.textInput).value = "";
	},

	render: function(){
		return (
				<div className="container">
					<header>
						<h1>Todo List</h1>
						
						<form onSubmit={ this.handleSubmit } className="new-task">
							<input 
								type="text" 
								ref="textInput" 
								placeholder="Type to add new tasks" />
						</form>
					</header>


					<ul>
						{ this.renderTasks() }
					</ul>
				</div>
			);
	}
})
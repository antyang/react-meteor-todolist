App = React.createClass({

	// this misxin makes the getMeteorData method work
	mixins: [ReactMeteorData],
	
	// loads items from the Tasks collection and puts them on this.data.tasks
	getMeteorData(){
		return {
			tasks: Tasks.find({}).fetch()
		}
	},


	/** Hardedcode Dummydata
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

	render: function(){
		return (
				<div className="container">
					<header>
						<h1>Todo List</h1>
					</header>

					<ul>
						{ this.renderTasks() }
					</ul>
				</div>
			);
	}
})
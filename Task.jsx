// task component - represents a single todo item
Task = React.createClass({
	propTypes: {
		// this component gets the task to display through a React prop.
		// we can use propTypes to indicate it is required
		task: React.PropTypes.object.isRequired,
		showPrivateButton: React.PropTypes.bool.isRequired,
	},
	
	toggleChecked(){
		// sets the checked property to the opposite of its current value
		// Tasks.update(this.props.task._id, {
		// 	$set: {checked: ! this.props.task.checked}
		// });
		Meteor.call("setChecked", this.props.task._id, ! this.props.task.checked);
	},

	deleteThisTask(){
		// Tasks.remove(this.props.task._id);
		Meteor.call("removeTask", this.props.task._id);
	},
	togglePrivate(){
		Meteor.call("setPrivate", this.props.task._id, ! this.props.task.private);
	},

	render: function(){
		// give tasks a different className when they are checked off,
		// so that we can style them nicely in CSS
		const taskClassName = (this.props.task.checked ? "checked" : "") + " " +
			(this.props.task.private ? "private" : "");

		return (
				// <li>{ this.props.task.text }</li>
				<li className={ taskClassName }>
					<button className="delete" onClick={ this.deleteThisTask }>
						&times;
					</button>

					<input 
						type="checkbox" 
						readOnly={true} 
						check={ this.props.task.checked }
						onClick={ this.toggleChecked } />

						{ this.props.showPrivateButton ? (
								<button className="toggle-private" onClick={this.togglePrivate}>
									{this.props.task.private ? "Private" : "Public"}
								</button>
							) : "" }

					<span className="text">
						<strong>{ this.props.task.username }</strong>: {this.props.task.text}
					</span>

				</li>
			)
	}
})
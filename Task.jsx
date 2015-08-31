// task component - represents a single todo item
Task = React.createClass({
	propTypes: {
		// this component gets the task to display through a React prop.
		// we can use propTypes to indicate it is required
		task: React.PropTypes.object.isRequired
	},
	render: function(){
		return (
				<li>{ this.props.task.text }</li>
			)
	}
})
AccountsUIWrapper = React.createClass({
	componentDidMount(){
		// use meteor blaze to render login buttons
		this.view = Blaze.render(Template.loginButtons,
			React.findDOMNode(this.refs.container));
	},
	componentWillUnmount(){
		// clean up blaze view
		Blaze.remove(this.view);
	},
	render: function(){
		// render a placeholder cainer that will be filled in
		return <span ref="container" />
	}
})
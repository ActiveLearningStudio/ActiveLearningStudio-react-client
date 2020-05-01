import React from "react";
import { Link } from "react-router-dom";
import H5PPreview from "../containers/H5PPreview";

export class PreviewPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.loadResourceAction(this.props.resourceid);
	}

	render() {
		console.log(this.props);
		return (
			<div className="row">
				<div className="col-1 align-self-center display-1">
					<Link to="/" className="pull-right"><i className="fa fa-chevron-circle-left" aria-hidden="true"></i></Link>
				</div>
				<div className="col-10">
					<H5PPreview {...this.props} resourceid={this.props.resourceid} />
				</div>
				<div className="col-1 align-self-center display-1">
					<Link to="/" className="pull-left"><i className="fa fa-chevron-circle-right" aria-hidden="true"></i></Link>
				</div>
			</div>
		);
	}
}

export default ResourcePreview;

const mapDispatchToProps = dispatch => ({
  loadResourceAction: (resourceid) => dispatch(loadResourceAction(resourceid)),
});

const mapStateToProps = (state) => {
  return {
    resource: state.resource
  };
}




export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(PreviewPage))
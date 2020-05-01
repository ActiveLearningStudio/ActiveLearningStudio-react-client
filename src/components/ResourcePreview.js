import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { loadResourceAction } from "../actions/resource";
import H5PPreview from "../containers/H5PPreview";

export class ResourcePreview extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.loadResourceAction(this.props.resourceid);
	}

	render() {
		if(this.props.resource.nextResourceId)
			var next = (<Link to={"/resource/preview/"+this.props.resource.nextResourceId} className="next-prev-link"><i className="fa fa-chevron-circle-right" aria-hidden="true"></i></Link>)
		else
			var next = "";

		if(this.props.resource.previousResourceId)
			var previous = (<Link to={"/resource/preview/"+this.props.resource.previousResourceId} className="next-prev-link"><i className="fa fa-chevron-circle-left" aria-hidden="true"></i></Link>)
		else
			var previous = "";

		return (
			<div className="container">
				<div className="row">
					{/* <div className="col-1 align-self-center display-1">
						
					</div> */}
					<div className="row">
						<div className="col-md-12">
							{previous}{next}
						</div>
					</div>
					<div className="col-md-12">
					
						<H5PPreview {...this.props} resourceid={this.props.resourceid} />
					</div>
					{/* <div className="col-1 align-self-center display-1">
						
					</div> */}
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
  loadResourceAction: (resourceid) => dispatch(loadResourceAction(resourceid)),
});

const mapStateToProps = (state) => {
  return {
    resource: state.resource
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResourcePreview))
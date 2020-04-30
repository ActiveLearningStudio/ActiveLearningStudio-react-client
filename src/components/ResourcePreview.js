import React from "react";
import { Link } from "react-router-dom";
import H5PPreview from "../containers/H5PPreview";

const ResourcePreview = (props) => {
	return (
		<H5PPreview {...props} resourceid={props.resourceid} />
	)
}

export default ResourcePreview;
import React from 'react';
import { connect } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter 
  } from "react-router-dom";

import { showSelectActivityAction, showDescribeActivityAction, showBuildActivityAction, showCreateResourceActivityAction } from "./../../../actions/resource";

const AddResourceSidebar = (props) => {
    return (
        <>
            <div className="create-resource-sidebar">
                <div className={"activity-sidebar-btn first " + (props.resource.isActivityTypeFilled ? ' filled ' : null)+ (props.resource.isResourceActivityType ? ' selected ' : null)}>
                    <div className="btn-box">
                        <div className="number-box ">
                            <span className="number">1</span>
                        </div>
                        <span className="bottom-vertical-line"></span>
                    </div>
                    <span className="name" /*onClick={() => props.showCreateResourceActivityAction()}*/>Pick Activity Type</span>
                </div>
                <div className={"activity-sidebar-btn " + (props.resource.isSelectActivityFilled ? ' filled ' : null) + (props.resource.isResourceSelectActivity ? ' selected ' : null)}>
                    <div className="btn-box">
                        <span className="top-vertical-line"></span>
                        <div className="number-box ">
                            <span className="number">2</span>
                        </div>
                        <span className="bottom-vertical-line"></span>
                    </div>
                    <span className="name" /*onClick={(activity) => props.showSelectActivityAction(1)}*/>Select Activity</span>
                </div>
                <div className={"activity-sidebar-btn " + (props.resource.isDescribeFilled ? ' filled ' : null) + (props.resource.isResourceDescribeActivity ? ' selected ' : null)}>
                    <div className="btn-box">
                        <span className="top-vertical-line"></span>
                        <div className="number-box ">
                            <span className="number">3</span>
                        </div>
                        <span className="bottom-vertical-line"></span>
                    </div>
                    <span className="name" /*onClick={(activity) => props.showDescribeActivityAction('H5P.InteractiveVideo 1.21')}*/>Describe Activity</span>
                </div>

                <div className={"activity-sidebar-btn last " + (props.resource.isResourceActivityBuild ? 'selected' : null)}>
                    <div className="btn-box">
                        <span className="top-vertical-line"></span>
                        <div className="number-box ">
                            <span className="number">4</span>
                        </div>
                    </div>
                    <span className="name" /*onClick={(editor, editorType) => props.showBuildActivityAction('H5P.InteractiveVideo 1.21', 'h5p')}*/>Build Activity</span>
                </div>

            </div>
        </>
    );
}



const mapDispatchToProps = dispatch => ({
    showCreateResourceActivityAction: () => dispatch(showCreateResourceActivityAction()),
    showSelectActivityAction: (activityType) => dispatch(showSelectActivityAction(activityType)),
    showDescribeActivityAction: (activity) => dispatch(showDescribeActivityAction(activity)),
    showBuildActivityAction: (editor, editorType) => dispatch(showBuildActivityAction(editor, editorType)),
    
    
});

const mapStateToProps = (state) => {
    return {
        resource: state.resource
    };
}

export default withRouter(connect(mapStateToProps,
    mapDispatchToProps)(AddResourceSidebar));
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { slideInRight } from 'react-animations';

import styled, { keyframes } from 'styled-components';
// import { showCreateResourceActivityAction, showBuildActivityAction } from "./actions/resource";


import ResourceActivityType from './ResourceActivityType';
import ResourceSelectActivity from './ResourceSelectActivity';
import ResourceDescribeActivity from './ResourceDescribeActivity';
import ResourceActivityBuild from './ResourceActivityBuild';


import './../AddResource/AddResource.scss';



const bounceAnimation = keyframes`${slideInRight}`;

const BouncyDiv = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

const EditResource = (props) => {
    useEffect(() => {
        props.showBuildActivityAction(null, null, props.match.params.activityid); // show create resource activity wizard
    }, []);

    return (
        <div className="resource-modal">
            <div className="modal fade right" id="editResourceModal" role="dialog" aria-labelledby="editResourceModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <BouncyDiv className="modal-content">
                        <div className="modal-title">
                            <h1>
                                Edit Activity
                              <button type="button" className="close-btn" data-dismiss="modal" onClick={props.handleHideCreateResourceModal}>x</button>
                            </h1>

                            <hr />
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className="col-md-12">

                                    {/* Edit Activity */}
                                    {props.openEditResourcePopup ?
                                        <ResourceActivityBuild {...props} />
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                    </BouncyDiv>
                </div>
            </div>
        </div>
    )
}
export default EditResource;
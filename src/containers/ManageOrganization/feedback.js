import React from 'react';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateOrganizationScreen, clearHistory, setActiveOrganization, updatePreviousScreen,
} from 'store/actions/organization';

const Feedback = () => {
  const dispatch = useDispatch();
  const stateFeedback = useSelector((state) => state.organization);
  const {
    newlyCreated, feedbackType, history,
  } = stateFeedback;
  return (
    <div className="feedback-org">
      {feedbackType?.action === 'user:delete'
        ? (
          <h4>
            The user&nbsp;
            <strong>
              {feedbackType?.name}
            </strong>
            &nbsp;has been
            deleted!
          </h4>
        )
        : (
          <h4>
            Your organization&nbsp;
            <strong>
              {newlyCreated?.name}
            </strong>
            &nbsp;has been
            &nbsp;
            {feedbackType === 'create' && 'created!'}
            {feedbackType === 'delete' && 'deleted!'}
            {feedbackType === 'update' && 'updated'}
          </h4>
        )}
      {feedbackType === 'create' && (
        <div>
          <p className="email">
            We’ve sent  an email to your users, now they can login in your organization.
          </p>
          {/* <p className="info">
            Now you can star adding projects, creating groups or teams to your organization.
          </p> */}
          {/* <div className="all-btn">
            <Link to={`/org/${stateFeedback?.currentOrganization?.domain}/project/create`} className="btn-curriki-primary">
              Add a Project
            </Link>
            <Link to={`/org/${stateFeedback?.currentOrganization?.domain}/groups/create-group`} className="btn-curriki-primary">
              Create a Group
            </Link>
            <Link to={`/org/${stateFeedback?.currentOrganization?.domain}/teams/create-team`} className="btn-curriki-primary">
              Add a Team
            </Link>
          </div> */}
        </div>
      )}
      {feedbackType?.action !== 'user:delete' ? (
        <div
          className="back"
          onClick={() => {
            if (history) {
              dispatch(setActiveOrganization(history));
              dispatch(clearHistory());
            }
            dispatch(updateOrganizationScreen('all-list'));
          }}
        >
          Back to Organizations
        </div>
      )
        : (
          <div
            className="back"
            onClick={() => {
              dispatch(updateOrganizationScreen('Users'));
              dispatch(updatePreviousScreen('intro'));
            }}
          >
            Back to Users
          </div>
        )}
    </div>
  );
};

export default Feedback;

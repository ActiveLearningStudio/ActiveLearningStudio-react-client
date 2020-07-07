import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import { Field, reduxForm } from 'redux-form';

import { showSelectActivityAction, onChangeActivityTypeAction } from 'store/actions/resource';
import AddResourceSidebar from './AddResourceSidebar';

import './style.scss';

const fadeAnimation = keyframes`${fadeIn}`;

const FaceDiv = styled.div`
  animation: 1s ${fadeAnimation};
`;

// const activityTypes = [
//   {
//     id: 1,
//     title: 'Interactive',
//     icon: '/assets.images/course-presentation.png',
//     overlayIcon: '/assets.images/course-presentation-overlay.png',
//   },
//   {
//     id: 2,
//     title: 'Multimedia',
//     icon: '/assets.images/multimedia-icon.png',
//     overlayIcon: '/assets.images/multimedia-icon-overlay.png',
//   },
//   {
//     id: 3,
//     title: 'Questions',
//     icon: '/assets.images/question-icon.png',
//     overlayIcon: '/assets.images/question-icon-overlay.png',
//   },
//   {
//     id: 4,
//     title: 'Social Media',
//     icon: '/assets.images/share-icon.png',
//     overlayIcon: '/assets.images/share-icon-overlay.png',
//   },
// ];

// TODO: need to refactor code

const required = (value) => (value ? undefined : '* Required');

const ResourceActivityTypeField = ({
  input,
  type,
  meta: { touched, error, warning },
}) => (
  <>
    <input {...input} type={type} />
    {touched
      && ((error && <span className="validation-error">{error}</span>)
        || (warning && <span>{warning}</span>))}
  </>
);

ResourceActivityTypeField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

let ResourceActivityType = (props) => {
  const [activityTypes, setActivityTypes] = useState([]);

  useEffect(() => {
    // get activity types
    const { token } = JSON.parse(localStorage.getItem('auth'));

    // TODO: need to move service or store
    axios.get(`${global.config.laravelAPIUrl}/api/activity-types`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setActivityTypes(response.data.data);
      });
  }, []);

  const { handleSubmit, onChangeActivityType } = props;

  const activityTypesContent = activityTypes.map((activity) => (
    <div className="col-md-3" key={activity._id}>
      <label className="activity-label">
        <Field
          name="activityType"
          component={ResourceActivityTypeField}
          type="radio"
          value={`${activity._id}`}
          onChange={() => onChangeActivityType(activity._id)}
          validate={[required]}
        />

        <div className="activity-item">
          <div
            className="activity-img"
            style={{
              backgroundImage: `url(${global.config.laravelAPIUrl}${activity.image})`,
            }}
          />

          <div className="activity-content">
            <span>{activity.title}</span>
          </div>
        </div>
      </label>
    </div>
  ));

  return (
    <div className="row">
      <div className="col-md-3">
        <AddResourceSidebar {...props} />
      </div>

      <div className="col-md-9">
        <div className="resource-activity">
          <FaceDiv>
            <div className="row">
              <div className="col-md-12">
                <h2 className="title">Pick Activity Type</h2>

                <div className="activity-content">
                  <p>
                    Create memorable learning experiences from one of the
                    activity types below:
                  </p>
                </div>
              </div>
            </div>

            <form
              className="row meta-form"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              {activityTypesContent}
              {/*
              <div className="col-md-12">
                <button type="submit" className="add-resource-continue-btn">
                  Continue
                </button>
              </div>
              */}
            </form>
          </FaceDiv>
        </div>
      </div>
    </div>
  );
};

ResourceActivityType.propTypes = {
  resource: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onChangeActivityType: PropTypes.func.isRequired,
};

ResourceActivityType = reduxForm({
  form: 'activityTypeForm',
  enableReinitialize: true,
  onSubmit: async (values, dispatch, props) => {
    try {
      props.onChangeActivityType();
      const data = values.activityType;
      props.showSelectActivity(data);
    } catch (e) {
      console.log(e.message);
    }
  },
  onChange: (values, dispatch, props) => {
    // props.onChangeActivityType(values.activityType);
    const data = values.activityType;
    props.showSelectActivity(data);
    // props.submit();
  },
})(ResourceActivityType);

const mapDispatchToProps = (dispatch) => ({
  showSelectActivity: (activityType) => dispatch(showSelectActivityAction(activityType)),
  onChangeActivityType: (activityTypeId) => dispatch(onChangeActivityTypeAction(activityTypeId)),
});

const mapStateToProps = (state) => ({
  resource: state.resource,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResourceActivityType),
);

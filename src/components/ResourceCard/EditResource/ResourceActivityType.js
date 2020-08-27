import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { required, FadeDiv } from 'utils';
import { showSelectActivityAction } from 'store/actions/resource';
import EditResourceSidebar from './EditResourceSidebar';
import ResourceActivityTypeField from '../fields/ResourceActivityTypeField';

const activities = [
  {
    id: 1,
    title: 'Interactive',
    icon: '/assets.images/course-presentation.png',
    overlayIcon: '/assets.images/course-presentation-overlay.png',
  },
  {
    id: 2,
    title: 'Multimedia',
    icon: '/assets.images/multimedia-icon.png',
    overlayIcon: '/assets.images/multimedia-icon-overlay.png',
  },
  {
    id: 3,
    title: 'Questions',
    icon: '/assets.images/question-icon.png',
    overlayIcon: '/assets.images/question-icon-overlay.png',
  },
  {
    id: 4,
    title: 'Social Media',
    icon: '/assets.images/share-icon.png',
    overlayIcon: '/assets.images/share-icon-overlay.png',
  },
];

// TODO: unused component
let ResourceActivityType = (props) => {
  const {
    handleSubmit,
    onChangeActivityType,
  } = props;

  const activitiesContent = activities.map((activity) => (
    <div className="col-md-3" key={activity.id}>
      <label className="activity-label">

        <Field
          name="activityType"
          component={ResourceActivityTypeField}
          type="radio"
          value={activity.id}
          onChange={onChangeActivityType}
          validate={[required]}
        />

        <div className="activity-item">
          <div className="activity-img">
            <img src={activity.icon} className="activity-icon" alt="" />
            <img src={activity.overlayIcon} className="overlay-activity-icon" alt="" />
          </div>
          <div className="activity-content">
            <span>
              {activity.title}
            </span>
          </div>
        </div>
      </label>
    </div>
  ));

  return (
    <div className="row">
      <div className="col-md-3">
        <EditResourceSidebar {...props} />
      </div>

      <div className="col-md-9">
        <div className="resource-activity">
          <FadeDiv>
            <div className="row">
              <div className="col-md-12">
                <h2 className="title">Select the type of activity you want to create?</h2>
                <div className="activity-content">
                  <p>
                    Create memorable learning experiences from one of the activity types below:
                  </p>
                </div>
              </div>
            </div>

            <form className="row meta-form" onSubmit={handleSubmit} autoComplete="off">
              {activitiesContent}
              <div className="row">
                <div className="col-md-12">
                  <button type="submit" className="add-resource-continue-btn">Continue</button>
                </div>
              </div>
            </form>
          </FadeDiv>
        </div>
      </div>
    </div>
  );
};

ResourceActivityType.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onChangeActivityType: PropTypes.func.isRequired,
};

ResourceActivityType = reduxForm({
  form: 'activityTypeForm',
  enableReinitialize: true,
  onSubmit: (values, dispatch, props) => {
    try {
      const data = values.activityType;
      props.showSelectActivity(data);
    } catch (e) {
      console.log(e.message);
    }
  },
})(ResourceActivityType);

const mapDispatchToProps = (dispatch) => ({
  showSelectActivity: (activityType) => dispatch(showSelectActivityAction(activityType)),
});

const mapStateToProps = (state) => ({
  resource: state.resource,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResourceActivityType),
);

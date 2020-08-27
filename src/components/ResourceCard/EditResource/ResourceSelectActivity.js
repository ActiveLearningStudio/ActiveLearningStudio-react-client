import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { required, FadeDiv } from 'utils';
import { showDescribeActivityAction } from 'store/actions/resource';
import EditResourceSidebar from './EditResourceSidebar';
import ResourceActivityTypeField from '../fields/ResourceActivityTypeField';

const questions = [
  {
    text: 'Interactive Video',
    h5pLib: 'H5P.InteractiveVideo 1.21',
    type: 'h5p',
    icon: '/assets.images/interactive-video.png',
    overlayIcon: '/assets.images/interactive-video-overlay.png',
    description: 'Create videos enriched with interactions',
  },
  {
    text: 'Flash Cards',
    h5pLib: 'H5P.Flashcards 1.5',
    type: 'h5p',
    icon: '/assets.images/flash-cards.png',
    overlayIcon: '/assets.images/flash-cards-overlay.png',
    description: 'Create stylish and modern flash cards',
  },
  {
    text: 'Drag and Drop',
    h5pLib: 'H5P.DragQuestion 1.13',
    type: 'h5p',
    icon: '/assets.images/drag-and-drop.png',
    overlayIcon: '/assets.images/drag-and-drop-overlay.png',
    description: 'Create drag and drop tasks with assets.images',
  },
  {
    text: 'Timeline',
    h5pLib: 'H5P.Timeline 1.1',
    type: 'h5p',
    icon: '/assets.images/timeline.png',
    overlayIcon: '/assets.images/timeline-overlay.png',
    description: 'Create a timeline of events with multimedia',
  },
  {
    text: 'Accordion',
    h5pLib: 'H5P.Accordion 1.0',
    type: 'h5p',
    icon: '/assets.images/accordion.png',
    overlayIcon: '/assets.images/accordion-overlay.png',
    description: 'Create vertically stacked expandable items',
  },
  {
    text: 'Interactive Presentation',
    h5pLib: 'H5P.CoursePresentation 1.21',
    type: 'h5p',
    icon: '/assets.images/course-presentation.png',
    overlayIcon: '/assets.images/course-presentation-overlay.png',
    description: 'Create a presentation with interactive slides',
  },
];

// TODO: unused component
let ResourceSelectActivity = (props) => {
  const { handleSubmit, onChangeActivity } = props;

  const questionsContent = questions.map((activity) => (
    <div className="col-md-3" key={activity.id}>
      <label className="question-label">
        <Field
          name="activity"
          component={ResourceActivityTypeField}
          type="radio"
          value={activity.h5pLib}
          onChange={(e) => onChangeActivity(activity, e)}
          validate={[required]}
        />

        <div className="activity-item">
          <div className="activity-img">
            <img src={activity.icon} className="activity-icon" alt="" />
            <img src={activity.overlayIcon} className="overlay-activity-icon" alt="" />
          </div>

          <div className="activity-content">
            <span>{activity.text}</span>
            <p>{activity.description}</p>
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
        <div className="resource-question">
          <FadeDiv>
            <div className="row">
              <div className="col-md-12">
                <h2 className="title">Select the activity you want to build from the options below:</h2>
              </div>
            </div>

            <div className="row">
              <form className="row meta-form" onSubmit={handleSubmit} autoComplete="off">
                {questionsContent}
                <div className="col-md-12">
                  <button type="submit" className="add-resource-continue-btn">Continue</button>
                </div>
              </form>
            </div>
          </FadeDiv>
        </div>
      </div>
    </div>
  );
};

ResourceSelectActivity.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onChangeActivity: PropTypes.func.isRequired,
};

ResourceSelectActivity = reduxForm({
  form: 'SelectActivityForm',
  enableReinitialize: true,
  onSubmit: (values, dispatch, props) => {
    try {
      const data = values.activity;
      props.showDescribeActivity(data);
    } catch (e) {
      console.log(e.message);
    }
  },
})(ResourceSelectActivity);

const mapDispatchToProps = (dispatch) => ({
  showDescribeActivity: (activity) => dispatch(showDescribeActivityAction(activity)),
});

const mapStateToProps = (state) => ({
  resource: state.resource,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResourceSelectActivity),
);

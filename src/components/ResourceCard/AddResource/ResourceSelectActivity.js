import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { required, FadeDiv } from 'utils';
import {
  loadResourceItemsAction,
  showDescribeActivityAction,
  onChangeActivityAction,
  showCreateResourceActivity,
} from 'store/actions/resource';
import ResourceActivityTypeField from '../fields/ResourceActivityTypeField';
import MyVerticallyCenteredModal from '../../models/activityOptions';
import AddResourceSidebar from './AddResourceSidebar';

// TODO: need to refactor code

let ResourceSelectActivity = (props) => {
  const {
    resource,
    handleSubmit,
    goBackToActivity,
    onChangeActivity,
    loadResourceItems,
  } = props;

  const [activities, setActivities] = useState([]);
  const [searchActivities, setSearchActivities] = useState([]);
  const [activeType, setActiveType] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);

  const searchActivity = useCallback((e) => {
    const data = searchActivities.filter(
      (activity) => activity.title.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setActivities(data);
  }, [searchActivities]);

  useEffect(() => {
    // get activity type items
    loadResourceItems(resource.newResource.activityTypeId)
      .then((activityItems) => {
        setActivities(activityItems);
        setSearchActivities(activityItems);
      })
      .catch((/* e */) => {
        // console.log(e);
      });
  }, [loadResourceItems, resource.newResource.activityTypeId]);

  const questionsContent = activities.map((activity) => (
    <div className="col-md-3" key={activity.id}>
      <div className="activity-item with_options">
        <label className="question-label">
          <Field
            name="activity"
            component={ResourceActivityTypeField}
            type="radio"
            value={activity.h5pLib || activity.type}
            onChange={(e) => onChangeActivity(activity, e)}
            validate={[required]}
          />

          <div className="content">
            <div
              className="activity-img"
              style={{
                backgroundImage: `url(${global.config.laravelAPIUrl}${activity.image})`,
              }}
            />

            <div className="activity-content">
              <span>{activity.title}</span>
              <p>{activity.description}</p>
            </div>

            {/* <FontAwesomeIcon icon="star" /> */}
          </div>
        </label>

        <div className="option_section">
          <div
            className="option_type"
            onClick={() => {
              setCurrentActivity(activity);
              setActiveType('demo');
              setModalShow(true);
            }}
          >
            <FontAwesomeIcon icon="desktop" />
            demo
          </div>
          <div
            className="option_type"
            onClick={() => {
              setCurrentActivity(activity);
              setActiveType('video');
              setModalShow(true);
            }}
          >
            <FontAwesomeIcon icon="play-circle" />
            Video
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <AddResourceSidebar {...props} />
        </div>

        <div className="col-md-9">
          <div className="resource-question">
            <FadeDiv>
              <div className="row">
                <div className="col-md-12">
                  <h2 className="title">
                    <div className="back-button" onClick={goBackToActivity}>
                      <FontAwesomeIcon icon="chevron-left" />
                      Back
                    </div>
                    Select the activity you want to build from the options below:
                  </h2>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="shadowbox">
                    <div className="dropdown">
                      {/*
                      <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        data-toggle="dropdown"
                      >
                        Sort By
                        <span className="caret"></span>
                      </button>

                      <ul className="dropdown-menu">
                        <li>
                          <a href="#"></a>
                        </li>
                        <li>
                          <a href="#"></a>
                        </li>
                        <li>
                          <a href="#"></a>
                        </li>
                      </ul>
                      */}
                    </div>

                    <div className="searchbox">
                      <input
                        type="text"
                        placeholder="Search activity"
                        onChange={searchActivity}
                      />
                      <FontAwesomeIcon icon="search" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <form
                  className="row meta-form"
                  onSubmit={handleSubmit}
                  autoComplete="off"
                >
                  <div className="scrollblog">
                    <div className="row">{questionsContent}</div>
                  </div>

                  {/*
                  <div className="col-md-12">
                    <button type="submit" className="add-resource-continue-btn">
                      Continue
                    </button>
                  </div>
                  */}
                </form>
              </div>
            </FadeDiv>
          </div>
        </div>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        activity={currentActivity}
        activeType={activeType}
      />
    </>
  );
};

ResourceSelectActivity.propTypes = {
  resource: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loadResourceItems: PropTypes.func.isRequired,
  onChangeActivity: PropTypes.func.isRequired,
  goBackToActivity: PropTypes.func.isRequired,
};

ResourceSelectActivity = reduxForm({
  form: 'SelectActivityForm',
  enableReinitialize: true,
  onSubmit: async (values, dispatch, props) => {
    try {
      const data = values.activity;
      props.showDescribeActivity(data);
    } catch (e) {
      // console.log(e.message);
    }
  },
  onChange: (values, dispatch, props) => {
    const data = values.activity;
    // props.onChangeActivity(data);
    props.showDescribeActivity(data);
  },
})(ResourceSelectActivity);

const mapDispatchToProps = (dispatch) => ({
  loadResourceItems: (activityTypeId) => dispatch(loadResourceItemsAction(activityTypeId)),
  showDescribeActivity: (activity) => dispatch(showDescribeActivityAction(activity)),
  onChangeActivity: (e, activity) => dispatch(onChangeActivityAction(e, activity)),
  goBackToActivity: () => dispatch(showCreateResourceActivity()),
});

const mapStateToProps = (state) => ({
  resource: state.resource,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResourceSelectActivity),
);

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
  showCreateResourceActivityAction,
  saveSearchKeyInCreation,
} from 'store/actions/resource';
import ResourceActivityTypeField from '../fields/ResourceActivityTypeField';
import MyVerticallyCenteredModal from '../../models/activityOptions';
// import AddResourceSidebar from './AddResourceSidebar';

// TODO: need to refactor code

let ResourceSelectActivity = (props) => {
  const {
    resource,
    handleSubmit,
    // goBackToActivity,
    onChangeActivity,
    loadResourceItems,
    saveSearchKey,
    selectType,
    type,
    setActiveView,
  } = props;

  const [activities, setActivities] = useState([]);
  const [searchActivities, setSearchActivities] = useState([]);
  const [activeType, setActiveType] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);

  const searchActivity = useCallback(
    (e) => {
      const data = searchActivities.filter((activity) => activity.title.toLowerCase().includes(e.target.value.toLowerCase()));
      setActivities(data);
      saveSearchKey(e.target.value.toLowerCase());
    },
    [saveSearchKey, searchActivities],
  );

  // useEffect(() => {
  //   searchActivity({ target: { value: resource.searchKey } });
  // }, [resource.searchKey, searchActivities, searchActivity]);

  useEffect(() => {
    // get activity type items
    loadResourceItems(resource.newResource.activityTypeId)
      .then((activityItems) => {
        const { searchKey } = resource;
        if (searchKey) {
          const data = activityItems.filter((activity) => activity.title.toLowerCase().includes(searchKey));
          setActivities(data);
        } else {
          setActivities(activityItems);
        }
        setSearchActivities(activityItems);
      })
      .catch(() => { });
  }, [loadResourceItems, resource.newResource.activityTypeId]);

  const questionsContent = activities.map((activity) => (
    <div className="col-lg-4 col-xl-3 responsive-pad" key={activity.id}>
      <div className="activity-item with_options">
        <label className="question-label">
          <Field
            name="activity"
            component={ResourceActivityTypeField}
            type="radio"
            value={activity.h5pLib || activity.type}
            onChange={(e) => {
              onChangeActivity(activity, e);
              setActiveView('describe');
              selectType([...type, 'describe']);
            }}
            validate={[required]}
          />

          <div className="content">
            <div
              className="activity-img"
              style={{
                backgroundImage: activity.image.includes('pexels.com')
                  ? `url(${activity.image})`
                  : `url(${global.config.resourceUrl}${activity.image})`,
              }}
            />

            <div className="activity-content">
              <span>{activity.title}</span>
              <p>{activity.description}</p>
            </div>
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
            <FontAwesomeIcon icon="desktop" className="mr-2" />
            Demo
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
        {/* <div className="col-md-3">
          <AddResourceSidebar {...props} />
        </div> */}

        <div className="col-md-12">
          <div className="resource-question">
            <FadeDiv>
              <div className="row">
                <div className="col-md-12">
                  <h2 className="title">
                    Select the activity you want to build from the options below:
                    <div
                      className="back-button"
                      onClick={() => {
                        setActiveView('type');
                        type.splice(type.indexOf('select', 1));
                        selectType(type);
                      }}
                    >
                      <FontAwesomeIcon icon="chevron-left" className="mr-2" />
                      Back
                    </div>
                  </h2>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="shadowbox">
                    <div className="search-box">
                      <input
                        type="text"
                        placeholder="Search activity"
                        onChange={searchActivity}
                        defaultValue={resource.searchKey}
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
                  <div className="scroll-blog">
                    <div className="row">{questionsContent}</div>
                  </div>
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
  // goBackToActivity: PropTypes.func.isRequired,
  saveSearchKey: PropTypes.func.isRequired,
  selectType: PropTypes.func.isRequired,
  type: PropTypes.array.isRequired,
  setActiveView: PropTypes.func.isRequired,
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
  goBackToActivity: () => dispatch(showCreateResourceActivityAction()),
  saveSearchKey: (searchKey) => dispatch(saveSearchKeyInCreation(searchKey)),
});

const mapStateToProps = (state) => ({
  resource: state.resource,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResourceSelectActivity),
);

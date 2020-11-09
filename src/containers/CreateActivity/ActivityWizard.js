import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ResourceActivityType from 'components/ResourceCard/AddResource/ResourceActivityType';
import ResourceSelectActivity from 'components/ResourceCard/AddResource/ResourceSelectActivity';
import ResourceDescribe from 'components/ResourceCard/AddResource/ResourceDescribeActivity';
import ResourceBuild from 'components/ResourceCard/AddResource/ResourceActivityBuild';
import { createResourceAction, createResourceByH5PUploadAction } from 'store/actions/resource';

function ActivityWizard(props) {
  const { match, history } = props;
  const [activeState, setActiveState] = useState(['type']);
  const [activeView, setActiveView] = useState('type');
  const resource = useSelector((state) => state.resource);
  const dispatch = useDispatch();

  const handleCreateResourceSubmit = async (
    currentPlaylistId,
    editor,
    editorType,
    payload,
    metadata,
    projectId,
  ) => {
    try {
      if (payload.submitAction === 'upload') {
        payload.event.preventDefault();

        await dispatch(createResourceByH5PUploadAction(
          currentPlaylistId,
          editor,
          editorType,
          payload,
          metadata,
          projectId,
        ));
      } else {
        await dispatch(createResourceAction(
          currentPlaylistId,
          editor,
          editorType,
          metadata,
          projectId,
        ));
      }

      history.push(`/project/${match.params.projectId}`);
    } catch (e) {
      // console.log(e.message);
    }
  };

  return (
    <div className="activity-wizard">
      <h2>Create a New  Activity</h2>
      <div className="Activity-meter">
        <div className={activeState.includes('type') ? 'active activity-progress' : 'activity-progress'}>
          <div className="round-counter">
            <div className="counter">
              1
            </div>
          </div>
          <h3>Pick Activity Type</h3>
          <FontAwesomeIcon icon="chevron-right" />
        </div>
        <div className={activeState.includes('select') ? 'active activity-progress' : 'activity-progress'}>
          <div className="round-counter">
            <div className="counter">
              2
            </div>
          </div>
          <h3>Select Activity</h3>
          <FontAwesomeIcon icon="chevron-right" />
        </div>
        <div className={activeState.includes('describe') ? 'active activity-progress' : 'activity-progress'}>
          <div className="round-counter">
            <div className="counter">
              3
            </div>
          </div>
          <h3>Describe Activity</h3>
          <FontAwesomeIcon icon="chevron-right" />
        </div>
        <div className={activeState.includes('build') ? 'active activity-progress' : 'activity-progress'}>
          <div className="round-counter">
            <div className="counter">
              4
            </div>
          </div>
          <h3>Build Activity</h3>
        </div>
      </div>
      {activeView === 'type'
      && (
      <ResourceActivityType
        selectType={setActiveState}
        type={activeState}
        setActiveView={setActiveView}
      />
      )}

      {activeView === 'select'
      && (
      <ResourceSelectActivity
        selectType={setActiveState}
        type={activeState}
        setActiveView={setActiveView}
      />
      )}

      {activeView === 'describe'
      && (
      <ResourceDescribe
        selectType={setActiveState}
        type={activeState}
        setActiveView={setActiveView}
      />
      )}

      {activeView === 'build'
      && (
      <ResourceBuild
        selectType={setActiveState}
        type={activeState}
        setActiveView={setActiveView}
        resource={resource}
        handleCreateResourceSubmit={handleCreateResourceSubmit}
      />
      )}
    </div>
  );
}

ActivityWizard.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(ActivityWizard);

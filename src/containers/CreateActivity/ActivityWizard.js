import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ResourceActivityType from 'components/ResourceCard/AddResource/ResourceActivityType';
import ResourceSelectActivity from 'components/ResourceCard/AddResource/ResourceSelectActivity';
import ResourceDescribe from 'components/ResourceCard/AddResource/ResourceDescribeActivity';
import ResourceBuild from 'components/ResourceCard/AddResource/ResourceActivityBuild';
import { createResourceAction } from 'store/actions/resource';
import ActivityMeter from './ActivityMeter';

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
      <ActivityMeter activeState={activeState} />
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

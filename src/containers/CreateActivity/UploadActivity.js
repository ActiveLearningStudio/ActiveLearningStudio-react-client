import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import H5PEditor from 'components/ResourceCard/AddResource/Editors/H5PEditor';
import { createResourceByH5PUploadAction } from 'store/actions/resource';
import ResourceDescribe from 'components/ResourceCard/AddResource/ResourceDescribeActivity';
import ActivityMeter from './ActivityMeter';

function ActivityWizard(props) {
  const { match, history } = props;
  const [activeState, setActiveState] = useState(['describe']);
  const [activeView, setActiveView] = useState('describe');
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
      <H5PEditor
        selectType={setActiveState}
        type={activeState}
        setActiveView={setActiveView}
        resource={resource}
        handleCreateResourceSubmit={handleCreateResourceSubmit}
        upload
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

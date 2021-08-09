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
  const [activeStateUpload, setActiveStateUpload] = useState(['describe']);
  const [activeViewUpload, setActiveViewUpload] = useState('describe');
  const resource = useSelector((state) => state.resource);
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
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

      history.push(`/studio/org/${organization.currentOrganization?.domain}/project/${match.params.projectId}`);
    } catch (e) {
      // console.log(e.message);
    }
  };

  return (
    <div className="activity-wizard upload-wizard">
      <h2>Load a Saved Activity</h2>
      <ActivityMeter activeState={activeStateUpload} upload />
      {activeViewUpload === 'describe'
      && (
      <ResourceDescribe
        selectType={setActiveStateUpload}
        type={activeStateUpload}
        setActiveView={setActiveViewUpload}
      />
      )}

      {activeViewUpload === 'build'
      && (
      <H5PEditor
        selectType={setActiveStateUpload}
        type={activeStateUpload}
        setActiveView={setActiveViewUpload}
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

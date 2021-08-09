import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ResourceDescribe from 'components/ResourceCard/EditResource/ResourceDescribeActivity';
import ResourceBuild from 'components/ResourceCard/EditResource/ResourceActivityBuild';
import { editResourceAction, showDescribeActivityAction } from 'store/actions/resource';
import Swal from 'sweetalert2';
import ActivityMeter from './ActivityMeter';

function ActivityWizard(props) {
  const { match, history } = props;
  const [activeState, setActiveState] = useState(['describe']);
  const [activeView, setActiveView] = useState('describe');
  const resource = useSelector((state) => state.resource);
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const handleEditResourceSubmit = async (
    currentPlaylistId,
    editor,
    editorType,
    activityId,
    metadata,
  ) => {
    try {
      Swal.fire({
        title: 'Editing Activity',
        html: 'Please wait! Updating activity...',
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      await dispatch(editResourceAction(
        currentPlaylistId,
        editor,
        editorType,
        activityId,
        metadata,
      ));

      history.push(`/studio/org/${organization.currentOrganization?.domain}/project/${match.params.projectId}`);
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(() => {
    dispatch(showDescribeActivityAction(resource, match.params.activityId));
  }, []);
  return (
    <div className="activity-wizard">
      <h2>Edit Current Activity</h2>
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
      <ResourceBuild
        selectType={setActiveState}
        type={activeState}
        setActiveView={setActiveView}
        resource={resource}
        handleEditResourceSubmit={handleEditResourceSubmit}
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

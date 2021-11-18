/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import './previewlayout.scss';
import Tabs from 'utils/Tabs/tabs';
import H5PEditor from 'components/ResourceCard/AddResource/Editors/H5PEditorV2';

import { useSelector, useDispatch } from 'react-redux';

const PreviewLayoutModel = (props) => {
  const resource = useSelector((state) => state.resource);
  console.log(props?.formData);
  const { selectedLayout, playlist, project, activity } = useSelector((state) => state.myactivities);
  const dispatch = useDispatch();
  return (
    <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered className="preview-layout-model">
      <Modal.Header closeButton style={{ display: 'block !important' }}>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ display: 'block !important' }}>
        <div className="interactive-video-H5P">
          <div className="add-activity-form">
            <div className="add-activity-tabs">
              <Tabs text="1. Select  activity" tabActive={true} />
              <Tabs text="2. Describe activity" className="ml-10" tabActive={true} />
              <Tabs text="3. Create activity" className="ml-10 " tabActive={true} />
            </div>
          </div>
          <H5PEditor
            playlistId={playlist.id}
            h5pLib={
              activity
                ? activity.h5p_content.library.name + ' ' + activity.h5p_content.library.major_version + '.' + activity.h5p_content.library.minor_version
                : selectedLayout?.h5pLib
            }
            h5pLibType={activity?.type || selectedLayout?.type}
            payload={''}
            formData={props?.formData}
            projectId={project}
            h5pParams={activity?.h5p}
            hide={props.onHide}
            editActivity={activity ? true : false}
            activityId={activity?.id}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

PreviewLayoutModel.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
};

PreviewLayoutModel.defaultProps = {
  show: false,
};

export default PreviewLayoutModel;

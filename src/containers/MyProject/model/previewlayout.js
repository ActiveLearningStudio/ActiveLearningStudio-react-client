/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Alert } from 'react-bootstrap';
import './previewlayout.scss';
import Tabs from 'utils/Tabs/tabs';
import H5PEditor from 'components/ResourceCard/AddResource/Editors/H5PEditorV2';
import Buttons from 'utils/Buttons/buttons';
import { useSelector, useDispatch } from 'react-redux';
import { loadH5pSettingsActivity } from 'store/actions/resource';

const PreviewLayoutModel = (props) => {
  const resource = useSelector((state) => state.resource);
  const { selectedLayout, layout, playlist, project, activity } = useSelector((state) => state.myactivities);
  const dispatch = useDispatch();
  const { type, title, video } = props;
  var counter = 0;

  useEffect(() => {
    if (type === 'videoModal') {
      dispatch(loadH5pSettingsActivity());
    }
  }, []);
  return (
    <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered className="preview-layout-model">
      <Modal.Header closeButton style={{ display: 'block !important' }}>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ display: 'block !important' }}>
        <div className="interactive-video-H5P">
          {type === 'videoModal' ? (
            <H5PEditor
              h5pParams={
                props.editVideo.h5p_content
                  ? props.editVideo.h5p_content.parameters
                  : `{"params":{"interactiveVideo":{ "video" : {"files": [{"path":"${video}","mime":"video/YouTube"}]}}},"metadata":{"title":"${title}"}}`
              }
              h5pLib="H5P.InteractiveVideo 1.22"
              hide={props.onHide}
              type={type}
              formData={props?.formData}
            />
          ) : (
            <>
              <div className="add-activity-form">
                <div className="add-activity-tabs">
                  <Tabs text="1. Select  layout" tabActive={true} />
                  {
                    ((counter = 0),
                    layout?.map((data) => {
                      if (data.id === selectedLayout?.id && counter == 0) {
                        counter++;
                        return (
                          <>
                            <Tabs text="2. Describe and  create layout" className="ml-10" tabActive={true} />
                          </>
                        );
                      }
                    }))
                  }
                  {counter === 0 && (
                    <>
                      <Tabs text="2. Select activity" className="ml-10" tabActive={true} />
                      <Tabs text="3. Describe and  create activity" className="ml-10" tabActive={true} />
                    </>
                  )}
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
            </>
          )}
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

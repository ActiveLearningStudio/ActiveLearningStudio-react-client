/*eslint-disable*/
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FileUpload from './fileUpload';
import Pexels from './pexels';

const ModalImage = (props) => {
  const { show, handleClose, mediaSources } = props;
  const [loader, setLoader] = useState(false);
  const openFile = useRef();
  return (
    <>
      <Modal className="thumbnails-modal" show={show} backdrop="static" keyboard={false} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body className="thumbnails-modal-body">
          <div className="thumbnails-close">
            <h4 className="thumbnails-heading">Browse Images</h4>
            <div className="thumb-close-button">
              <FontAwesomeIcon className="ml-2" icon="times" onClick={handleClose} />
            </div>
          </div>
          <p className="thumbnails-text">You are currently viewing Thumbnails form Category. You can search other thumbnails below as well.</p>

          <Tabs
            defaultActiveKey="Pexels"
            id="uncontrolled-tab-example"
            className="thumbnails-tabs"
            onSelect={(k) => {
              if (k === 'device') {
                openFile.current?.click();
              } else {
                setLoader(false);
              }
            }}
          >
            {mediaSources.some((obj) => obj.name === 'Pexels' && obj.media_type === 'Image') && (
              <Tab eventKey="Pexels" title="Pexels">
                <Pexels {...props} loader={loader} setLoader={setLoader} />
              </Tab>
            )}
            {mediaSources.some((obj) => obj.name === 'Smithsonian' && obj.media_type === 'Image') && (
              <Tab eventKey="Simthsonian" title="Simthsonian">
                <Pexels {...props} smythsonian={true} loader={loader} setLoader={setLoader} />
              </Tab>
            )}
            {mediaSources.some((obj) => obj.name === 'My device' && obj.media_type === 'Image') && <Tab eventKey="device" title="My Device"></Tab>}
          </Tabs>
        </Modal.Body>
      </Modal>
      <FileUpload openFile={openFile} {...props} />
    </>
  );
};

export default ModalImage;

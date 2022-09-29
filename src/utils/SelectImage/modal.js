/*eslint-disable*/
import React, { useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FileUpload from './fileUpload';
import Pexels from './pexels';

const ModalImage = (props) => {
  const { show, handleClose } = props;
  const [loader, setLoader] = useState(false);
  const openFile = useRef();
  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <div className="title">
            <p>CurrikiStudio</p>
            <h2 className="curriki-utility-headings">
              <FontAwesomeIcon className="mr-2" icon="search" />
              Explore Library Content
            </h2>
          </div>
          <div className="close">
            <FontAwesomeIcon className="ml-2" icon="times" onClick={handleClose} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="Pexels"
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={(k) => {
              if (k === 'device') {
                openFile.current?.click();
              } else {
                setLoader(false);
              }
            }}
          >
            <Tab eventKey="Pexels" title="Pexels">
              <Pexels {...props} loader={loader} setLoader={setLoader} />
            </Tab>
            <Tab eventKey="Simthsonian" title="Simthsonian">
              <Pexels {...props} smythsonian={true} loader={loader} setLoader={setLoader} />
            </Tab>
            <Tab eventKey="device" title="My Device"></Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <div className="row">
            <div className="col footer-info"></div>
          </div>
        </Modal.Footer>
      </Modal>
      <FileUpload openFile={openFile} {...props} />
    </>
  );
};

export default ModalImage;

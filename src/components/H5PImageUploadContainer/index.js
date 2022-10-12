/*eslint-disable*/
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import H5PImageUploadMyDevice from "components/H5PImageUploadContainer/H5PImageUploadMyDevice";
import H5PImageUploadPexels from "components/H5PImageUploadContainer/H5PImageUploadPexels";
import H5PImageUploadSmithsonian from "components/H5PImageUploadContainer/H5PImageUploadSmithsonian";

const H5PImageUploadContainer = (props) => {
  const {
    closeModal,
    details,
    layout,
  } = props;

  const handleCloseModal = () => {
    closeModal();
  };

  const handleTabChange = () => {
    console.log('tab changed');
  };

  const handleImageUpload = (file) => {
    console.log('upload image to h5p');
    details.callback(file);
    closeModal();
  };

  return (
    <Modal show backdrop="static" keyboard={false} size="xl" aria-labelledby="contained-modal-title-vcenter" centered className="existing-activity-search-modal">
      <Modal.Header>
        <div className="title">
          <p>Browse Images</p>
          <h2 className="curriki-utility-headings">
            <FontAwesomeIcon className="mr-2" icon="search" />
            Explore image libraries
          </h2>
        </div>
        <div className="close">
          <FontAwesomeIcon className="ml-2" icon="times" onClick={handleCloseModal} />
        </div>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          defaultActiveKey="mydevice"
          className="main-tabs"
          onSelect={handleTabChange}
        >
          <Tab eventKey="mydevice" title="My Device">
            <H5PImageUploadMyDevice uploadHandler={handleImageUpload} />
          </Tab>
          <Tab eventKey="pexels" title="Pexels">
            <H5PImageUploadPexels uploadHandler={handleImageUpload} />
          </Tab>
          <Tab eventKey="smithsonian" title="Smithsonian">
            <H5PImageUploadSmithsonian uploadHandler={handleImageUpload} />
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <div className="row">
          <div className="col footer-info">
            <FontAwesomeIcon className="mr-2" icon="info-circle" />
            {`You're searching for images to insert in ${layout.title}`}
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

H5PImageUploadContainer.propTypes = {
};

H5PImageUploadContainer.defaultProps = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(H5PImageUploadContainer));
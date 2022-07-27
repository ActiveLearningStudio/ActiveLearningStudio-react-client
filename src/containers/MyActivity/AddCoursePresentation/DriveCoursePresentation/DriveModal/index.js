/*eslint-disable*/
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import './style.scss';
import cross from 'assets/images/cross-icon.png';
import gapiService from "services/gapi.service";
import slidesLogo from 'assets/images/slides_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from "react-bootstrap";

const DriveModal = ({token, fileSelectedCallback, closeModalCallback}) => {
  const [files, setFiles] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getSlides();
  }, [query]);

  const getSlides = () => {
    gapiService.getGoogleSlides(token, query).then((response) => {
      setFiles(response.data.files);
    }).catch(() => {
      setFiles([]);
    });
  };

  return (
    <Modal show backdrop="static" keyboard={false} size="xl" aria-labelledby="contained-modal-title-vcenter" centered className="google-drive-search-modal">
      <Modal.Header>
          <h2 className="curriki-utility-headings">Import Slides</h2>
          <FontAwesomeIcon icon="times" onClick={closeModalCallback} />
      </Modal.Header>
      <Modal.Body>
        <div className='row'>
          <div className='col drive-modal-search'>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search for Google Slide presentations" onChange={(e) => setQuery(e.target.value)} value={query}/>
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button">
                    <FontAwesomeIcon icon="search" />
                  </button>
                </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            {files.length === 0 && (
              <Alert variant={'info'}>No presentations found.</Alert>
            )}
            <div className='google-drive-file-cards'>
                {files.map((file) => (
                  <div fileid={file.id} filename={file.name} key={file.id} onClick={fileSelectedCallback}>
                    <img src={slidesLogo} />
                    <p>{file.name}</p>
                  </div>
                ))}
            </div>                      
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

DriveModal.propTypes = {
};

DriveModal.defaultProps = {
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DriveModal));
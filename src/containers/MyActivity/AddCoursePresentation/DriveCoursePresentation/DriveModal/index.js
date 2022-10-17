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
import { Alert, Table } from "react-bootstrap";

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
          <div className='col'>
            <Alert variant="info" className="modal-info">
              <FontAwesomeIcon icon="info-circle" className="mr-2"/>
              Select a Google Slides file to import from your drive. Max filesize 15 MB.
            </Alert>
          </div>
      </div>
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
            {files.length > 0 && (
              <div className='google-drive-file-table-container'>
                <Table hover>
                  <thead>
                    <tr>
                      <th>Filename</th>
                      <th className='text-right'>Size</th>
                      <th className='text-right'>Last Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file) => (
                      <tr fileid={file.id} filename={file.name} key={file.id} onClick={fileSelectedCallback}>
                        <td><img src={file.iconLink}/>{file.name}</td>
                        <td className='text-right'>
                          {file.size && (`${Math.ceil(parseInt(file.size) / (1024 * 1024))} MB`)}
                          {!file.size && 'N/A'}
                        </td>
                        <td className='text-right'>
                          <span className='d-block'>{new Date(file.createdTime).toLocaleDateString()}</span>
                          <span className='d-block'>{file.lastModifyingUser?.displayName}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>                      
            )}
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
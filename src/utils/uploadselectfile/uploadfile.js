/* eslint-disable */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './uploadfile.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
// import Buttons from 'utils/Buttons/buttons';
import { createResourceByH5PUploadAction } from 'store/actions/resource';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import UploadImg from '../../assets/images/upload1.png';

const UploadFile = ({ className, formRef, activityPreview }) => {
  const { selectedLayout, playlist, project } = useSelector((state) => state.myactivities);
  const imgUpload = useRef();
  const dispatch = useDispatch();
  const currikiUtility = classNames('curriki-utility-uploadfile', className);
  const setH5pFileUpload = (e) => {
    e.preventDefault();
    formRef.current.handleSubmit();
    const h5pFile = e.target.files[0];
    const fileArr = h5pFile.name.split('.');
    const fileExtension = fileArr.length > 0 ? fileArr[fileArr.length - 1] : '';
    if (fileExtension !== 'h5p') {
      Swal.fire('Invalid file selected, kindly select h5p file.');
      return true;
    }
    const submitAction = 'upload';
    const payload = {
      e,
      submitAction,
      h5pFile,
    };
    console.log(formRef.current.values, 'upload file');
    dispatch(createResourceByH5PUploadAction(playlist.id, selectedLayout?.h5pLib, 'h5p', payload, formRef.current.values, activityPreview));
  };
  return (
    <>
      <div className={currikiUtility}>
        <div className="uploadfile-box">
          <div className="drop-area">
            <button
              type="button"
              onClick={() => {
                formRef.current.handleSubmit();
                if (formRef.current.values.title && formRef.current.values.title.length < 255) {
                  imgUpload.current.click();
                }
              }}
            >
              <FontAwesomeIcon icon={faUpload} className="curriki_btn-mr-2" />
              Select File
            </button>
            <input
              type="file"
              name="h5p_file"
              id="h5p-file"
              className="laravel-h5p-upload form-control"
              onChange={(e) => {
                formRef.current.handleSubmit();
                if (formRef.current.values.title && formRef.current.values.title.length < 255) {
                  setH5pFileUpload(e);
                }
              }}
              ref={imgUpload}
              style={{
                cursor: 'pointer',
                background: '#F1F1F1',
                padding: '160px 41px 0px 41px',
                borderRadius: '8px',
                border: 'none',
              }}
              onClick={(e) => {
                e.target.value = '';
              }}
            />
            <div className="upload-holder">
              <img src={UploadImg} alt="upload" className="mr-2" />
              <p>
                Drag & drop file or &nbsp;
                <span
                  onClick={() => {
                    formRef.current.handleSubmit();
                    if (formRef.current.values.title && formRef.current.values.title.length < 255) {
                      imgUpload.current.click();
                    }
                  }}
                  style={{ color: '#2e8df5' }}
                >
                  browse
                </span>
                &nbsp;to upload
              </p>
            </div>
          </div>
        </div>
        {/* <div className="upload-btn">
          <Buttons
            text="upload"
            primary={true}
            width="142px"
            height="35px"
            hover={true}
          />
        </div> */}
      </div>
    </>
  );
};

UploadFile.propTypes = {
  className: PropTypes.string.isRequired,
  formRef: PropTypes.func.isRequired,
};

export default UploadFile;

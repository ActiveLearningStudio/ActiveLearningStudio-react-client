/*eslint-disable*/
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './uploadimage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PexelsAPI from '../../components/models/pexels';
import DefaultImage from 'assets/images/activitycard.png';
import PixelIcon from 'assets/images/svg/pixel.svg';
import { faLaptop, faLink, faHdd, faParachuteBox } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const UploadImage = ({ className, setUploadImageStatus, title, defuaultImage }) => {
  const [modalShow, setModalShow] = useState(false);
  const currikiUtility = classNames('curriki-utility-uploadimage', className);
  const project = useSelector((state) => state.project);
  const openFile = useRef();
  defuaultImage == null ? defuaultImage : DefaultImage;
  return (
    <>
      <PexelsAPI
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setUploadImageStatus(false);
        }}
        project={project}
        searchName="abstract"
      />
      <div className={currikiUtility}>
        <p>{title}</p>
        <div
          className="uploadimage-box"
          style={{
            backgroundImage: project.thumbUrl
              ? !project.thumbUrl.includes('/storage/')
                ? `url(${project.thumbUrl})`
                : `url(${global.config.resourceUrl}${project.thumbUrl})`
              : `url(${DefaultImage})`,
          }}
        >
          {/* <img src={DefaultImage} alt="" /> */}
        </div>
        {/* <div className="uploadimage-option">
          <FontAwesomeIcon icon={faLaptop} className="upload-option mr-20" />
          <FontAwesomeIcon icon={faLink} className="upload-option mr-20" />
          <FontAwesomeIcon icon={faHdd} className="upload-option mr-20" />
          <FontAwesomeIcon
            icon={faParachuteBox}
            className="upload-option mr-20"
            onClick={() => {
              setModalShow(true);
              setUploadImageStatus(true);
            }}
          />
        </div> */}
        <div className="uploadimage-option">
          <label style={{ display: 'none' }}>
            <input
              ref={openFile}
              type="file"
              accept="image/x-png,image/jpeg"
              onChange={(e) => {
                if (e.target.files.length === 0) {
                  return true;
                }
                if (
                  !(
                    e.target.files[0].type.includes('png') ||
                    e.target.files[0].type.includes('jpg') ||
                    e.target.files[0].type.includes('gif') ||
                    e.target.files[0].type.includes('jpeg')
                  )
                ) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Invalid file selected.',
                  });
                } else if (e.target.files[0].size > 100000000) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Selected file size should be less then 100MB.',
                  });
                } else {
                  uploadThumb(e);
                }
              }}
            />
            <span>Upload</span>
          </label>
          <button
            type="button"
            onClick={() => {
              openFile.current.click();
            }}
            className="btn-mr-27"
          >
            <FontAwesomeIcon icon={faLaptop} className="mr-20" />
            My device
          </button>
          <button
            type="button"
            onClick={() => {
              setModalShow(true);
              setUploadImageStatus(true);
            }}
          >
            <img src={PixelIcon} className="mr-20" />
            Pexels
          </button>
        </div>
      </div>
    </>
  );
};

UploadImage.propTypes = {
  className: PropTypes.string,
};

export default UploadImage;

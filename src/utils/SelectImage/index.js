/* eslint-disable */
import React, { useState } from 'react';
import Buttons from 'utils/Buttons/buttons';
import Modal from './modal';
import './style.scss';

import dragImage from '../../assets/images/Icons-explanatory-activity.png';

const SelectImage = (props) => {
  const { containerType = 'Project', image } = props;
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="curriki-image-update-util">
        <p>{containerType} Thumbnail Image</p>
        <div className="box-section">
          <img
            style={{
              backgroundImage: !image.includes('/storage/') ? `url(${image})` : `url(${global.config.resourceUrl}${image})`,
            }}
            className="thumbnail"
          />
          <div className="overlay">
            <img className="overlay-drag-image" src={dragImage} alt="drag" />
            <h6 className="overlay-drag-image-title">Drag & drop Image</h6>
            <h6 className="overlay-drag-image-or">Or</h6>
            <Buttons className="overlay-drag-brows-btn" text="Browse" onClick={() => setShow(true)} />
          </div>
        </div>
      </div>
      <Modal show={show} handleClose={() => setShow(false)} {...props} />
    </>
  );
};

export default SelectImage;

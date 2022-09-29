/* eslint-disable */
import React, { useState } from 'react';
import Buttons from 'utils/Buttons/buttons';
import Modal from './modal';
import './style.scss';

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
            <img src="" alt="" />
            <p>
              <b>Drag & drop Image</b>
            </p>
            <p>
              <b>----- Or -----</b>
            </p>
            <Buttons text="Browse" onClick={() => setShow(true)} />
          </div>
        </div>
      </div>
      <Modal show={show} handleClose={() => setShow(false)} {...props} />
    </>
  );
};

export default SelectImage;

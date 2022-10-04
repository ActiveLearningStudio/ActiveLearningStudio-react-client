/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Buttons from 'utils/Buttons/buttons';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './modal';
import { getMediaSources } from 'store/actions/admin';
import './style.scss';

import dragImage from '../../assets/images/Icons-explanatory-activity.png';

const SelectImage = (props) => {
  const { containerType = 'Project', image, setshowSmythsonianModal } = props;
  const [show, setShow] = useState(false);
  const [mediaSources, setMediaSources] = useState([]);
  const organization = useSelector((state) => state.organization);
  const dispatch = useDispatch();

  useEffect(() => {
    if (show && containerType === 'Activity') {
      setshowSmythsonianModal(true);
    }
  }, [show]);
  useEffect(() => {
    if (mediaSources.length === 0) {
      const result = dispatch(getMediaSources(organization?.activeOrganization?.id));
      result.then((data) => {
        setMediaSources(data.mediaSources);
      });
    }
  }, [mediaSources]);
  console.log('images', image);
  return (
    <>
      <div className="curriki-image-update-util">
        <p>{containerType} Thumbnail Image</p>
        <div className="box-section">
          <img
            style={{
              backgroundImage: image.includes('/storage/') ? `url(${image})` : `url(${image})`,
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
      <Modal
        show={show}
        handleClose={() => {
          setShow(false);
          if (containerType === 'Activity') {
            setshowSmythsonianModal(false);
          }
        }}
        {...props}
        mediaSources={mediaSources}
      />
    </>
  );
};

export default SelectImage;

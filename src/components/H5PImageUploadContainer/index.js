/*eslint-disable*/
import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import { withRouter } from 'react-router-dom';
import Modal from '../../utils/SelectImage/modal';
import './styles.scss';
import {getMediaSources} from "../../store/actions/admin";

const H5PImageUploadContainer = (props) => {
  const {
    closeModal,
    details,
  } = props;

  const dispatch = useDispatch();
  const [mediaSources, setMediaSources] = useState([]);
  const organization = useSelector((state) => state.organization);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (mediaSources.length === 0) {
      const result = dispatch(getMediaSources(organization?.activeOrganization?.id));
      result.then((data) => {
        setMediaSources(data.mediaSources);
        setShow(true);
      });
    }
  }, [mediaSources]);

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
        <Modal
          show={show}
          returnImage={(e) => handleImageUpload(e)}
          returnImagePexel={(e) => handleImageUpload(e)}
          handleClose={() => {
            setShow(false);
            handleCloseModal();
          }}
          {...props}
          mediaSources={mediaSources}
          setshowSmythsonianModal={true}
        />
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

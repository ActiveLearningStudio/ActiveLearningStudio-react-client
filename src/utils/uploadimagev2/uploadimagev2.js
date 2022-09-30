/*eslint-disable*/
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import './uploadimagev2.scss';
import PexelsAPI from '../../components/models/pexels';
// import PixelUpload from 'assets/images/svg/pixelupload.svg';
// import ActivityDefaultImg from 'assets/images/defaultActivityImg.png';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import SelectImage from 'utils/SelectImage';
import { toast } from 'react-toastify';
import { uploadResourceThumbnailAction } from 'store/actions/resource';
import computer from 'assets/images/computer1.svg';
import { getMediaSources } from 'store/actions/admin';
// import MyDeviceSmSvg from 'iconLibrary/mainContainer/MyDeviceSmSvg';
// import PexelsSmSvg from 'iconLibrary/mainContainer/PexelsSmSvg';

const UploadImageV2 = ({ className, setUploadImageStatus, formRef, thumb_url, setshowSmythsonianModal }) => {
  const project = useSelector((state) => state.project);
  const organization = useSelector((state) => state.organization);

  // const [modalShow, setModalShow] = useState(false);
  // const currikiUtility = classNames('curriki-utility-uploadimageV2', className);
  const dispatch = useDispatch();
  // const openFile = useRef();
  const [uploadImage, setUploadImage] = useState(thumb_url);
  const [mediaSources, setMediaSources] = useState([]);

  const uploadThumb = async (e) => {
    const formData = new FormData();
    try {
      formData.append('thumb', e.target.files[0]);
      const result = await dispatch(uploadResourceThumbnailAction(formData));
      setUploadImage(result);

      formRef.current.setFieldValue('thumb_url', result);
    } catch (err) {
      toast.error('Upload Failed', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
      });
    }
  };

  useEffect(() => {
    if (mediaSources.length === 0) {
      const result = dispatch(getMediaSources(organization?.activeOrganization?.id));
      result.then((data) => {
        setMediaSources(data.mediaSources);
      });
    }
  }, [mediaSources]);
  return (
    <SelectImage
      image={uploadImage || 'https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280'}
      returnImage={(e) => uploadThumb(e)}
      returnImagePexel={(e) => setUploadImage(e)}
      setshowSmythsonianModal={setshowSmythsonianModal}
      mediaSources={mediaSources}
    />
  );
  //   <PexelsAPI
  //     show={modalShow}
  //     project={project}
  //     onHide={() => {
  //       setModalShow(false);
  //       setUploadImageStatus(false);
  //     }}
  //     searchName="abstract"
  //     setUploadImage={setUploadImage}
  //     formRef={formRef}
  //   />
  //   <div className={currikiUtility}>
  //     <h3>Activity Thumbnail Image</h3>
  //     <div
  //       className="uploadimage-box"
  //       style={{
  //         backgroundImage: !uploadImage
  //           ? `url(${ActivityDefaultImg})`
  //           : uploadImage.includes('pexels.com')
  //           ? `url(${uploadImage})`
  //           : `url(${global.config.resourceUrl}${uploadImage})`,
  //       }}
  //     ></div>
  //     <div className="uploadimage-option">
  //       <label style={{ display: 'none' }}>
  //         <input
  //           ref={openFile}
  //           type="file"
  //           accept="image/x-png,image/jpeg"
  //           onChange={(e) => {
  //             if (e.target.files.length === 0) {
  //               return true;
  //             }
  //             if (
  //               !(
  //                 e.target.files[0].type.includes('png') ||
  //                 e.target.files[0].type.includes('jpg') ||
  //                 e.target.files[0].type.includes('gif') ||
  //                 e.target.files[0].type.includes('jpeg')
  //               )
  //             ) {
  //               Swal.fire({
  //                 icon: 'error',
  //                 title: 'Error',
  //                 text: 'Invalid file selected.',
  //               });
  //             } else if (e.target.files[0].size > 100000000) {
  //               Swal.fire({
  //                 icon: 'error',
  //                 title: 'Error',
  //                 text: 'Selected file size should be less then 100MB.',
  //               });
  //             } else {
  //               uploadThumb(e);
  //             }
  //           }}
  //         />
  //         <span>Upload</span>
  //       </label>
  //       {/*
  //       {mediaSources.some((obj) => obj.name === 'Pexels' && obj.media_type === 'Image') && (
  //         <button
  //           type="button"
  //           onClick={() => {
  //             setModalShow(true);
  //             setUploadImageStatus(true);
  //           }}
  //           className="btn-mr-27"
  //         >
  //           <PexelsSmSvg primaryColor={'#515151'} className="mr-20" />
  //           Select from Pexels
  //         </button>
  //       )}

  //       {mediaSources.some((obj) => obj.name === 'My device' && obj.media_type === 'Image') && (
  //         <button
  //           type="button"
  //           onClick={() => {
  //             openFile.current.click();
  //           }}
  //         >
  //           <MyDeviceSmSvg primaryColor={'#515151'} className="mr-20" />
  //           Upload from My device
  //         </button>
  //       )} */}

  //     </div>
  //   </div>
  // </>
};

UploadImageV2.propTypes = {
  className: PropTypes.string,
};

export default UploadImageV2;

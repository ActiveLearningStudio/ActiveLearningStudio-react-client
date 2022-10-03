/* eslint-disable */
import React from 'react';
import Swal from 'sweetalert2';

import './style.scss';

const FileUpload = ({ openFile, returnImage, handleClose }) => {
  return (
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
            !(e.target.files[0].type.includes('png') || e.target.files[0].type.includes('jpg') || e.target.files[0].type.includes('gif') || e.target.files[0].type.includes('jpeg'))
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
            returnImage(e);
            handleClose();
          }
        }}
      />
      <span>Upload</span>
    </label>
  );
};

export default FileUpload;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';

const DragDropImage = ({ children, returnImageDragDrop }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      return true;
    }
    if (!(acceptedFiles[0].type.includes('png') || acceptedFiles[0].type.includes('jpg') || acceptedFiles[0].type.includes('gif') || acceptedFiles[0].type.includes('jpeg'))) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Invalid file selected.',
      });
    } else if (acceptedFiles[0].size > 100000000) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Selected file size should be less then 100MB.',
      });
    } else {
      returnImageDragDrop(acceptedFiles);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ noClick: true, onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
      {/* {isDragActive ? <p>Drop the files here ...</p> : <p>Drag n drop some files here, or click to select files</p>} */}
    </div>
  );
};

export default DragDropImage;

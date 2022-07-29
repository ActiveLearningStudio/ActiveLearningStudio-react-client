/* eslint-disable */
import React, { useEffect, useState } from 'react';
import FileUploadDnd from "components/FileInputDnd";
import FilePreviewAndStore from '../FilePreviewAndStore';

const UploadCoursePresentation = ({ setEnableDescribeBtn, setLoading }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div>
      <div className='row'>
        <div className='col'>
          <FileUploadDnd handleChange={handleFileChange}/>
        </div>
        <div className="col">
          <FilePreviewAndStore file={selectedFile} setEnableDescribeBtn={setEnableDescribeBtn} setLoading={setLoading}/>
        </div>
      </div>
    </div>
  );
};

export default UploadCoursePresentation;
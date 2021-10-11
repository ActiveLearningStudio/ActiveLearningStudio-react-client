/*eslint-disable*/
import React from "react";
import { useDispatch } from "react-redux";

import Buttons from "utils/Buttons/buttons";
import UploadFile from "utils/uploadselectfile/uploadfile";

const UploadInteractiveVideo = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="interactive-activity-form">
        <div className="interactive-load-save-activity">
          <UploadFile />
        </div>
        <div className="interactive-activity-btns">
          <Buttons
            text="Upload"
            primary={true}
            width="142px"
            height="35px"
            onClick={() => {
              dispatch({
                type: 'SET_ACTIVE_ACTIVITY_SCREEN',
                payload: "",
              });
            }}
          />
        </div>
      </div>
    </>
  );
};

export default UploadInteractiveVideo;

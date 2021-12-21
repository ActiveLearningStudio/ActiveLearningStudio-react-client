/*eslint-disable*/
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import DropDownEdit from 'utils/DropDownEdit/dropdownedit';
import videoServices from 'services/videos.services';

import './addvideocard.scss';

const AddVideoCard = ({ setModalShow, setCurrentActivity, setScreenStatus, setOpenVideo, className, data, selectionStatus = false, setAddActivityPopUp }) => {
  const [changeAddActivityPopUp, setChangeAddActivityPopUp] = useState(false);
  const currikiUtility = classNames('curriki-utility-addvideo-card', className);
  const dispatch = useDispatch();
  const { activeOrganization } = useSelector((state) => state.organization);
  return (
    <>
      <div className={currikiUtility}>
        <div
          className="addvideo-card-top"
          style={{
            backgroundImage: `url(${data.thumb_url?.includes('pexels.com') ? data.thumb_url : global.config.resourceUrl + data.thumb_url})`,
          }}
        >
          <div className="addvideo-card-dropdown">
            <DropDownEdit data={data} iconColor="white" />
          </div>
          <div className="addvideo-card-title">
            <h2>{data.title}</h2>
          </div>
        </div>
        <div className="addvideo-card-detail">
          <p>{data.descripiton}</p>
        </div>

        <div className="addvideo-card-add-share">
          <div className="btn-box">
            <FontAwesomeIcon
              onClick={() => {
                setCurrentActivity(data.id);
                setModalShow(true);
              }}
              icon={faEye}
              style={{ marginRight: '12px' }}
              color="#084892"
            />

            <FontAwesomeIcon
              icon={faEdit}
              style={{ marginRight: '12px' }}
              color="#084892"
              onClick={async () => {
                toast.dismiss();
                toast.info('Loading Activity ...', {
                  className: 'project-loading',
                  closeOnClick: false,
                  closeButton: false,
                  position: toast.POSITION.BOTTOM_RIGHT,
                  autoClose: 10000,
                  icon: '',
                });
                const result = await videoServices.videoh5pDetail(activeOrganization.id, data.id);
                toast.dismiss();

                dispatch({
                  type: 'SET_ACTIVE_VIDEO_SCREEN',
                  payload: result.activity,
                });
                setOpenVideo(true);
                setScreenStatus('DescribeVideo');
              }}
            />
          </div>
        </div>
        {selectionStatus && (
          <div className="addvideo-selection-box">
            <input type="checkbox" />
            <span>Select</span>
          </div>
        )}
      </div>
    </>
  );
};

AddVideoCard.propTypes = {
  className: PropTypes.string,
  backgroundImg: PropTypes.string,
  title: PropTypes.string,
  listView: PropTypes.bool,
  selectionStatus: PropTypes.bool,
};

export default AddVideoCard;

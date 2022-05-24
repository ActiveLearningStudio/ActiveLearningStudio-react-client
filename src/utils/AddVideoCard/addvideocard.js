/*eslint-disable*/
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faLink } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import DropDownEdit from 'utils/DropDownEdit/dropdownedit';
import videoServices from 'services/videos.services';
import intActivityServices from 'services/indActivities.service';

import './addvideocard.scss';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import { getIndex } from 'store/actions/indActivities';
import SharePreviewPopup from 'components/SharePreviewPopup';

const AddVideoCard = ({ setModalShow, setCurrentActivity, setScreenStatus, setOpenVideo, className, data, selectionStatus = false, permission, activities, isActivityCard }) => {
  const [changeAddActivityPopUp, setChangeAddActivityPopUp] = useState(false);
  const currikiUtility = classNames('curriki-utility-addvideo-card', className);
  const dispatch = useDispatch();
  const { activeOrganization } = useSelector((state) => state.organization);
  const primaryColor = getGlobalColor('--main-primary-color');
  const visibilityData = [
    {
      id: 1,
      name: 'private',
      display_name: 'Private (only Me)',
    },
    {
      id: 2,
      name: 'protected',
      display_name: 'My Organization',
    },
    {
      id: 3,
      name: 'global',
      display_name: 'My Org + Parent and Child Org',
    },
    {
      id: 4,
      name: 'public',
      display_name: 'All',
    },
  ];
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
            <DropDownEdit
              data={data}
              iconColor="white"
              activities={activities}
              isActivityCard={isActivityCard}
              setModalShow={setModalShow}
              setCurrentActivity={setCurrentActivity}
              setOpenVideo={setOpenVideo}
              setScreenStatus={setScreenStatus}
              permission={permission}
            />
          </div>
          <div className="addvideo-card-title">
            <h2>{data.title}</h2>
          </div>
        </div>
        <div className="addvideo-card-detail">
          <p>{data.description?.slice(0, 50)}</p>
        </div>
        {isActivityCard && (
          <>
            <div className="activity-update-lib">
              <div className="activity-update">Updated: {data.updated_at.split('T')[0]}</div>
              <div className="activity-lib">
                Library preference: <span>{visibilityData.filter((type) => type.id === data.organization_visibility_type_id)?.[0]?.display_name}</span>
              </div>
            </div>
          </>
        )}

        <div className="addvideo-card-add-share">
          <div className="btn-box">
            {isActivityCard ? (
              <>
                {data.shared && (
                  <>
                    <div
                      className="addvideo-card-add-share-options hover-apply"
                      onClick={() => {
                        if (window.gapi && window.gapi.sharetoclassroom) {
                          window.gapi.sharetoclassroom.go('croom');
                        }
                        const protocol = `${window.location.href.split('/')[0]}//`;
                        const url = `${protocol}${window.location.host}/activity/${data.id}/shared?type=ind`;
                        return SharePreviewPopup(url, data.title);
                      }}
                    >
                      <FontAwesomeIcon icon={faLink} style={{ marginRight: '6px' }} color={primaryColor} />
                      <span className="textinButton">Shared link</span>
                    </div>
                  </>
                )}
                <div
                  className="addvideo-card-add-share-options request-section-icon hover-apply "
                  onClick={() => {
                    if (data.indexing_text === 'NOT REQUESTED' && permission?.['Independent Activity']?.includes('independent-activity:edit-author')) {
                      dispatch(getIndex(data.id, 1));
                    }
                  }}
                >
                  {/* <FontAwesomeIcon
                    icon={faLink}
                    style={{ marginRight: "6px" }}
                    color={primaryColor}
                  /> */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: '6px' }}
                    // style={{ marginLeft: "26px" }}
                  >
                    <path
                      d="M1.33398 2H5.33398C6.04123 2 6.71951 2.28095 7.2196 2.78105C7.7197 3.28115 8.00065 3.95942 8.00065 4.66667V14C8.00065 13.4696 7.78994 12.9609 7.41486 12.5858C7.03979 12.2107 6.53108 12 6.00065 12H1.33398V2Z"
                      stroke="#084892"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.6667 2H10.6667C9.95942 2 9.28115 2.28095 8.78105 2.78105C8.28095 3.28115 8 3.95942 8 4.66667V14C8 13.4696 8.21071 12.9609 8.58579 12.5858C8.96086 12.2107 9.46957 12 10 12H14.6667V2Z"
                      stroke="#084892"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="textinButton">{data.indexing_text}</span>
                </div>
              </>
            ) : (
              <>
                <div
                  className="addvideo-card-add-share-options"
                  onClick={() => {
                    setCurrentActivity(data.id);
                    setModalShow(true);
                  }}
                >
                  <FontAwesomeIcon icon={faEye} style={{ marginRight: '6px' }} color={primaryColor} />
                  View &nbsp;&nbsp;&nbsp;
                </div>
                <div
                  onClick={() => {
                    setCurrentActivity(data.id);
                    setModalShow(true);
                  }}
                ></div>
                <div
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
                    if (activities) {
                      const result = await intActivityServices.intActivityDetail(activeOrganization.id, data.id);
                      if (result?.['independent-activity']) {
                        toast.dismiss();
                        dispatch({
                          type: 'SET_ACTIVE_VIDEO_SCREEN',
                          payload: result['independent-activity'],
                        });
                        setOpenVideo(true);
                        setScreenStatus('DescribeVideo');
                      }
                    } else {
                      const result = await videoServices.videoh5pDetail(activeOrganization.id, data.id);
                      if (result.activity?.brightcoveData) {
                        dispatch({
                          type: 'EDIT_CMS_SCREEN',
                          payload: result.activity?.brightcoveData.accountId,
                        });
                        window.brightcoveAccountId = result.activity?.brightcoveData.accountId;
                      }

                      toast.dismiss();
                      dispatch({
                        type: 'ADD_VIDEO_URL',
                        platform: '',
                      });
                      dispatch({
                        type: 'SET_ACTIVE_VIDEO_SCREEN',
                        payload: result.activity,
                      });

                      setOpenVideo(true);
                      setScreenStatus('AddVideo');
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} style={{ marginRight: '6px' }} color={primaryColor} />
                  Edit
                </div>
              </>
            )}
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

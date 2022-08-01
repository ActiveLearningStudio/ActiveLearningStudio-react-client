/* eslint-disable react/require-default-props */
/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import DropDownEdit from 'utils/DropDownEdit/dropdownedit';
import videoServices from 'services/videos.services';
import intActivityServices from 'services/indActivities.service';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import './addvideocard.scss';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import { getIndex } from 'store/actions/indActivities';
import SharePreviewPopup from 'components/SharePreviewPopup';
import { Info } from 'assets/curriki-icons';

const AddVideoCard = ({
  setModalShow,
  setCurrentActivity,
  setScreenStatus,
  setOpenVideo,
  className,
  data,
  selectionStatus = false,
  permission,
  activities,
  isActivityCard,
  handleShow,
  setSelectedActivityId,
  addToProjectCheckbox,
  setSelectedProjectstoAdd,
  selectedProjectstoAdd,
  sethideallothers,
  setisbackHide,
}) => {
  useEffect(() => {
    if (setSelectedProjectstoAdd) {
      setSelectedProjectstoAdd([]);
    }
  }, [addToProjectCheckbox]);
  const currikiUtility = classNames('curriki-utility-addvideo-card', className);
  const dispatch = useDispatch();
  const { activeOrganization } = useSelector((state) => state.organization);
  const primaryColor = getGlobalColor('--main-primary-color');
  const prapagraphColor = getGlobalColor('--main-paragraph-text-color');
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

  const openEditor = async () => {
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
        if (result?.['independent-activity']?.source_type) {
          setScreenStatus('AddVideo');
          sethideallothers(false);
          setisbackHide(true);
        } else {
          setScreenStatus('DescribeVideo');
          setisbackHide(false);
        }
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
      setisbackHide(true);
      setOpenVideo(true);
      setScreenStatus('AddVideo');
      sethideallothers(false);
    }
  };

  return (
    <>
      <div className={currikiUtility}>
        <div
          className={selectedProjectstoAdd?.includes(data.id) && addToProjectCheckbox ? 'addvideo-card-top apply-check-video' : 'addvideo-card-top apply-uncheck-video'}
          style={{
            backgroundImage: `url(${data.thumb_url?.includes('pexels.com') ? data.thumb_url : global.config.resourceUrl + data.thumb_url})`,
          }}
        >
          <div className="addvideo-card-dropdown">
            {addToProjectCheckbox ? (
              data.shared === false && data.organization_visibility_type_id === 1 ? (
                <>
                  <label className="cutom_checkbox">
                    {/* <input type="checked" /> */}
                    <input
                      type="checkbox"
                      onChange={() => {
                        if (selectedProjectstoAdd.includes(data.id)) {
                          setSelectedProjectstoAdd(selectedProjectstoAdd.filter((id) => id !== data.id));
                        } else {
                          setSelectedProjectstoAdd([...selectedProjectstoAdd, data.id]);
                        }
                      }}
                    />

                    <span />
                  </label>
                  {/* <input
                    type="checkbox"
                    onChange={() => {
                      if (selectedProjectstoAdd.includes(data.id)) {
                        setSelectedProjectstoAdd(selectedProjectstoAdd.filter((id) => id !== data.id));
                      } else {
                        setSelectedProjectstoAdd([...selectedProjectstoAdd, data.id]);
                      }
                    }}
                  /> */}
                </>
              ) : (
                <OverlayTrigger
                  placement="bottom"
                  className="curriki-tooltip"
                  delay={{ show: 250, hide: 400 }}
                  overlay={(props) => (
                    <Tooltip id="button-tooltip" {...props} className="button-tooltip_style">
                      To move this activity, please change to:
                      <ul>
                        <li>1. Sharing - Disabled</li>
                        <li>2. Library preference - Private</li>
                      </ul>
                    </Tooltip>
                  )}
                >
                  <Info />
                </OverlayTrigger>
              )
            ) : (
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
                handleShow={handleShow}
                setSelectedActivityId={setSelectedActivityId}
              />
            )}
          </div>
          <div onClick={() => openEditor()} className="addvideo-card-title">
            <h2>{data.title}</h2>
            {/* {selectedProjectstoAdd?.includes(data.id) && addToProjectCheckbox && '*'} */}
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
                Library Status: <span>{visibilityData.filter((type) => type.id === data.organization_visibility_type_id)?.[0]?.display_name}</span>
              </div>
            </div>
          </>
        )}

        <div className="addvideo-card-add-share">
          <div className="btn-box">
            {isActivityCard ? (
              <>
                <div className="addvideo-activity-menu-option">
                  <div
                    className="activity-request-tag"
                    onClick={() => {
                      if (data.indexing_text === 'NOT REQUESTED' && permission?.['Independent Activity']?.includes('independent-activity:edit-author')) {
                        dispatch(getIndex(data.id, 1));
                      }
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z"
                        // stroke="#767676"
                        stroke={prapagraphColor}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M7 4.6001V7.0001" stroke={prapagraphColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 9.3999H7.00533" stroke={prapagraphColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <span>{data.indexing_text}</span>
                  </div>
                  <div className="addvideo-card-add-share-options-parent ">
                    <div
                      className="addvideo-card-add-share-options hover-apply"
                      onClick={() => {
                        setCurrentActivity(data.id);
                        setModalShow(true);
                      }}
                    >
                      <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1.375 8C1.375 8 4.875 1 11 1C17.125 1 20.625 8 20.625 8C20.625 8 17.125 15 11 15C4.875 15 1.375 8 1.375 8Z"
                          stroke={primaryColor}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11 10.625C12.4497 10.625 13.625 9.44975 13.625 8C13.625 6.55025 12.4497 5.375 11 5.375C9.55025 5.375 8.375 6.55025 8.375 8C8.375 9.44975 9.55025 10.625 11 10.625Z"
                          stroke={primaryColor}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="textinButton">Preview</span>
                    </div>
                    {permission?.['Independent Activity']?.includes('independent-activity:edit-author') && (
                      <>
                        <div className="addvideo-card-add-share-options hover-apply" onClick={() => openEditor()}>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M9.05116 2.89764H2.78915C2.31464 2.89764 1.85956 3.08614 1.52403 3.42167C1.1885 3.7572 1 4.21228 1 4.68679V17.2108C1 17.6853 1.1885 18.1404 1.52403 18.4759C1.85956 18.8115 2.31464 19 2.78915 19H15.3132C15.7877 19 16.2428 18.8115 16.5783 18.4759C16.9138 18.1404 17.1023 17.6853 17.1023 17.2108V10.9488"
                              stroke={primaryColor}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.7602 1.55582C16.1161 1.19993 16.5988 1 17.1021 1C17.6054 1 18.088 1.19993 18.4439 1.55582C18.7998 1.9117 18.9997 2.39438 18.9997 2.89768C18.9997 3.40097 18.7998 3.88365 18.4439 4.23954L9.94548 12.738L6.36719 13.6326L7.26176 10.0543L15.7602 1.55582Z"
                              stroke={primaryColor}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="textinButton">Edit</span>
                        </div>
                      </>
                    )}

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
                          {' '}
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M8.18994 10.906C8.57864 11.4262 9.07455 11.8566 9.64404 12.168C10.2135 12.4795 10.8433 12.6647 11.4905 12.7111C12.1378 12.7575 12.7875 12.664 13.3955 12.437C14.0035 12.21 14.5557 11.8547 15.0144 11.3953L17.7298 8.67721C18.5541 7.82282 19.0103 6.67851 19 5.49073C18.9897 4.30295 18.5137 3.16675 17.6746 2.32683C16.8356 1.48692 15.7005 1.01049 14.5139 1.00017C13.3273 0.98985 12.1842 1.44646 11.3307 2.27165L9.77388 3.82094"
                              stroke={primaryColor}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M11.8102 9.09401C11.4215 8.57384 10.9256 8.14343 10.3561 7.83198C9.78661 7.52053 9.15687 7.33532 8.50959 7.28892C7.8623 7.24251 7.21263 7.336 6.60461 7.56304C5.9966 7.79007 5.44448 8.14534 4.98569 8.60476L2.27037 11.3228C1.44601 12.1772 0.98986 13.3215 1.00017 14.5093C1.01048 15.6971 1.48643 16.8333 2.3255 17.6732C3.16457 18.5131 4.29963 18.9895 5.48621 18.9999C6.67279 19.0102 7.81595 18.5536 8.66947 17.7284L10.2172 16.1791"
                              stroke={primaryColor}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="textinButton">Sharing</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {/* {data.shared && (
                  <>
                    <div
                      className="addvideo-card-add-share-options hover-apply"
                      onClick={() => {
                        if (window.gapi && window.gapi.sharetoclassroom) {
                          window.gapi.sharetoclassroom.go("croom");
                        }
                        const protocol = `${
                          window.location.href.split("/")[0]
                        }//`;
                        const url = `${protocol}${window.location.host}/activity/${data.id}/shared?type=ind`;
                        return SharePreviewPopup(url, data.title);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faLink}
                        style={{ marginRight: "6px" }}
                        color={primaryColor}
                      />
                      <span className="textinButton">Shared link</span>
                    </div>
                  </>
                )}

                <div
                  className="addvideo-card-add-share-options request-section-icon hover-apply "
                  onClick={() => {
                    if (
                      data.indexing_text === "NOT REQUESTED" &&
                      permission?.["Independent Activity"]?.includes(
                        "independent-activity:edit-author"
                      )
                    ) {
                      dispatch(getIndex(data.id, 1));
                    }
                  }}
                >

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: "6px" }}
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
                </div> */}
              </>
            ) : (
              <>
                <div
                  className="addvideo-card-add-share-options-ind"
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
                />
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
                    sethideallothers(false);
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

  title: PropTypes.string,

  selectionStatus: PropTypes.bool,
};

export default AddVideoCard;

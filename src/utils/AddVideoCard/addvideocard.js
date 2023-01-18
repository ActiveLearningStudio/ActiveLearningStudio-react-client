/* eslint-disable react/require-default-props */
/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { toast } from 'react-toastify';
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
import ViewMdSvg from 'iconLibrary/mainContainer/ViewMdSvg';
import EditMdSvg from 'iconLibrary/mainContainer/EditMdSvg';
import ShareLinkMdSvg from 'iconLibrary/mainContainer/ShareLinkMdSvg';
import RequestedTagSmSvg from 'iconLibrary/mainContainer/RequestedTagSmSvg';

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
      name: 'Private (only Me)',
      display_name: 'Private (only Me)',
    },
    {
      id: 3,
      name: 'My Organization',
      display_name: 'My Organization',
    },
    {
      id: 2,
      name: 'global',
      display_name: 'My Org + Parent and Child Org',
    },
    {
      id: 4,
      name: 'Public',
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
            backgroundImage: `url(${!data.thumb_url?.includes('/storage/') ? data.thumb_url : global.config.resourceUrl + data.thumb_url})`,
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
                  delay={{ show: 250, hide: 40000 }}
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
              <>
                {(!isActivityCard || (isActivityCard && permission?.['Independent Activity']?.includes('independent-activity:edit-author'))) && (
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
              </>
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
                Library Status: <span>{visibilityData.filter((type) => type.id === data.organization_visibility_type_id)?.[0]?.name}</span>
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
                    <RequestedTagSmSvg primaryColor={prapagraphColor} />
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
                      <ViewMdSvg primaryColor={primaryColor} />
                      <span className="textinButton">Preview</span>
                    </div>
                    {permission?.['Independent Activity']?.includes('independent-activity:edit-author') && (
                      <>
                        <div className="addvideo-card-add-share-options hover-apply" onClick={() => openEditor()}>
                          <EditMdSvg primaryColor={primaryColor} />
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
                          <ShareLinkMdSvg primaryColor={primaryColor} />
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
                  <ViewMdSvg primaryColor={primaryColor} className="mr-6" />
                  View &nbsp;&nbsp;&nbsp;
                </div>
                <div
                  onClick={() => {
                    setCurrentActivity(data.id);
                    setModalShow(true);
                  }}
                />
                <div
                  className="addvideo-card-add-share-options-ind"
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
                  <EditMdSvg primaryColor={primaryColor} className="mr-6" />
                  Edit &nbsp;&nbsp;&nbsp;
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

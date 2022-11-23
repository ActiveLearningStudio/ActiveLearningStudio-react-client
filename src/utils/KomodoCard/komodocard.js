/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import './komodocard.scss';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ViewMdSvg from 'iconLibrary/mainContainer/ViewMdSvg';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import DeleteSmSvg from 'iconLibrary/dropDown/DeleteSmSvg';
import KomodoIntgSnSvg from 'iconLibrary/mainContainer/KomodoIntgSnSvg';
import Swal from 'sweetalert2';

import 'utils/DropDownEdit/dropdownedit.scss';

const KomodoCard = ({ className, data }) => {
  const currikiUtility = classNames('curriki-utility-komodo-card', className);
  const dispatch = useDispatch();
  const primaryColor = getGlobalColor('--main-primary-color');

  return (
    <>
      <div className={currikiUtility}>
        <div
          className="komodo-card-top apply-uncheck-video"
          style={{
            backgroundImage: `url(${data.previewUrl})`,
          }}
        >
          <div className="komodo-card-dropdown">
            <div className="curriki-utility-activity-dropdown">
              <Dropdown className="activity-dropdown check ">
                <Dropdown.Toggle className="activity-dropdown-btn">
                  <FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: '13px', color: '#fff', marginLeft: '5px' }} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    className
                    onClick={() => {
                      Swal.fire({
                        title: 'Redirecting to Komodo Dashboard for deletion',
                        showConfirmButton: false,
                        showCancelButton: false,
                      });
                      setTimeout(() => {
                        Swal.close();

                        window.open('https://komododecks.com/recordings', '_blank');
                      }, 2000);
                    }}
                  >
                    <DeleteSmSvg primaryColor={primaryColor} className="mr-2" />
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="komodo-card-title">
            <h2>{data.title}</h2>
          </div>
        </div>
        <div className="komodo-card-detail">
          <div className="updated-date">Updated date :{data?.createdAt?.split(',')[0]}</div>
        </div>

        <div className="komodo-card-add-share">
          <div className="btn-box">
            <div className="komodo-activity-menu-option">
              <div className="komodo-card-add-share-options-parent ">
                <a href={data.htmlUrl} target="_blank">
                  <div
                    className="komodo-card-add-share-options hover-apply"
                    // onClick={() => {
                    //   setCurrentActivity(data);
                    //   setModalShow(true);
                    // }}
                  >
                    <ViewMdSvg primaryColor={primaryColor} />
                    <span className="textinButton">Preview</span>
                  </div>
                </a>
                <div
                  onClick={() => {
                    dispatch({
                      type: 'SET_ACTIVE_ACTIVITY_SCREEN',
                      payload: 'describevideo',
                      playlist: {},
                      project: {},
                    });
                    dispatch({
                      type: 'ADD_VIDEO_URL',
                      payload: data.htmlUrl,
                      platformName: 'Komodo',
                    });
                  }}
                  className="komodo-card-add-share-options hover-apply"
                >
                  <KomodoIntgSnSvg primaryColor={primaryColor} />
                  <span className="textinButton">Add Interaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

KomodoCard.propTypes = {
  className: PropTypes.string,
};

export default KomodoCard;

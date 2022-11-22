/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import DropDownEdit from 'utils/DropDownEdit/dropdownedit';
import './komodocard.scss';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';

import ViewMdSvg from 'iconLibrary/mainContainer/ViewMdSvg';

import KomodoIntgSnSvg from 'iconLibrary/mainContainer/KomodoIntgSnSvg';

const KomodoCard = ({ openEditor, className, data, setModalShow, setCurrentActivity }) => {
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
            <DropDownEdit iconColor="#fff" />
          </div>
          <div className="komodo-card-title">
            <h2>{data.title}</h2>
          </div>
        </div>
        <div className="komodo-card-detail">
          <p>Lorem ipsum dolor sit amet, consecte adipiscing elit.</p>
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
                    // openEditor(data);
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

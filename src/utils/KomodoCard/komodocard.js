/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DropDownEdit from 'utils/DropDownEdit/dropdownedit';
import './komodocard.scss';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';

import ViewMdSvg from 'iconLibrary/mainContainer/ViewMdSvg';
import EditMdSvg from 'iconLibrary/mainContainer/EditMdSvg';
import KomodoIntgSnSvg from 'iconLibrary/mainContainer/KomodoIntgSnSvg';

const KomodoCard = ({ className, data }) => {
  const currikiUtility = classNames('curriki-utility-komodo-card', className);

  const primaryColor = getGlobalColor('--main-primary-color');
  const prapagraphColor = getGlobalColor('--main-paragraph-text-color');

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
                <div className="komodo-card-add-share-options hover-apply">
                  <ViewMdSvg primaryColor={primaryColor} />
                  <span className="textinButton">Preview</span>
                </div>
                <div className="komodo-card-add-share-options hover-apply">
                  <KomodoIntgSnSvg primaryColor={primaryColor} />
                  <span className="textinButton">komodo</span>
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

/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import './overlaytiggerpop.scss';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OverlayTriggerPop = ({ className, icon, children, iconColor, showMessage = 'bottom', onClick = () => {} }) => {
  const currikiUtility = classNames('curriki-utility-overlay-card', className);
  return (
    <>
      <div className={currikiUtility} onClick={onClick}>
        <OverlayTrigger
          placement={showMessage}
          className="curriki-tooltip"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => (
            <Tooltip id="button-tooltip" {...props} className="button-tooltip_style">
              {children}
            </Tooltip>
          )}
        >
          {icon && <FontAwesomeIcon icon={icon} color={iconColor} />}
          {/* {svgIcon && svgIcon} */}
        </OverlayTrigger>
      </div>
    </>
  );
};

OverlayTriggerPop.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  icon: PropTypes.any,
};

export default OverlayTriggerPop;

/* eslint-disable react/require-default-props */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './subsearch.scss';
import { Alert, Dropdown } from 'react-bootstrap';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';

const SubSearchBar = ({ className, pageCounterTitle }) => {
  const currikiUtility = classNames('curriki-utility-subsearch', className);
  return (
    <div className={currikiUtility}>
      <div className="subsearch-top-search-filter">
        <div className="activity-counter">
          <div className="pagination-counter drop-counter ">
            {pageCounterTitle}
            <span>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">10</Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>10</Dropdown.Item>
                  <Dropdown.Item>25</Dropdown.Item>
                  <Dropdown.Item>50</Dropdown.Item>
                  <Dropdown.Item>100</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

SubSearchBar.propTypes = {
  className: PropTypes.string,
  pageCounterTitle: PropTypes.string,
};

export default SubSearchBar;

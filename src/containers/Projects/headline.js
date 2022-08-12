/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import foldericon from 'assets/images/svg/projectFolder.svg';
import { useSelector } from 'react-redux';
import { setCurrentVisibilityType } from 'store/actions/project';
import Headings from 'curriki-design-system/dist/utils/Headings/headings';
import Buttons from 'utils/Buttons/buttons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SearchForm from 'components/Header/searchForm';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';

export default function Headline({ setCreateProject }) {
  const organization = useSelector((state) => state.organization);
  const { currentOrganization, permission } = organization;
  const primaryColor = getGlobalColor('--main-primary-color');
  return (
    <>
      <div className="project-headline">
        <div className="title">
          <div className="title-name-heading-image">
            <Headings text={`${currentOrganization?.name}`} headingType="body2" color="#084892" />
            <div className="heading-image">
              {/* <img src={foldericon} alt="" /> */}
              <svg width="36" height="33" viewBox="0 0 36 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 7.4375V29.1875C2 30.1885 2.81149 31 3.8125 31H32.8125C33.8136 31 34.625 30.1885 34.625 29.1875V9.94715C34.625 8.94614 33.8136 8.13465 32.8125 8.13465H19.9856"
                  stroke={primaryColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M19.9856 8.13465L14.9529 2.26544C14.783 2.09548 14.5525 2 14.3121 2H2.90625C2.40575 2 2 2.40575 2 2.90625V7.4375"
                  stroke={primaryColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>

              {/* Projects */}
              <Headings text="My Projects" headingType="h2" color="#084892" />
            </div>
          </div>
          <div className="search-main-relaced">
            <div className="search-div">{/* <SearchForm /> */}</div>
            {/* {permission?.Project?.includes('project:create') && (
              <Buttons
                primary
                text="Create a project"
                icon={faPlus}
                iconColor="#FF0000"
                width="auto"
                height="35px"
                onClick={() => {
                  setCurrentVisibilityType(null);
                  setCreateProject(true);
                }}
                hover
              />
            )} */}
          </div>
        </div>
        {/* <Headings text="Create and organize your activities into projects to create complete courses." headingType="body2" color="#515151" className="top-heading-detail" /> */}
      </div>
    </>
  );
}

Headline.propTypes = {
  setCreateProject: PropTypes.func.isRequired,
};

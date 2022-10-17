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
import MyProjectLgSvg from 'iconLibrary/mainContainer/MyProjectLgSvg';

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
              <MyProjectLgSvg primaryColor={primaryColor} />
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

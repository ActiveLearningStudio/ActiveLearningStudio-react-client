import React from 'react';
import PropTypes from 'prop-types';
import foldericon from 'assets/images/svg/projectFolder.svg';
import { useSelector } from 'react-redux';
import { setCurrentVisibilityType } from 'store/actions/project';
import Headings from 'curriki-design-system/dist/utils/Headings/headings';
import Buttons from 'utils/Buttons/buttons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Headline({ setCreateProject, seteditMode }) {
  const organization = useSelector((state) => state.organization);
  const { currentOrganization, permission } = organization;

  return (
    <>
      <div className="project-headline">
        <div className="title">
          <div className="title-name-heading-image">
            <Headings text={`${currentOrganization?.name}`} headingType="body2" color="#084892" />
            <div className="heading-image">
              <img src={foldericon} alt="" />
              {/* Projects */}
              <Headings text="My Projects" headingType="h2" color="#084892" />
            </div>
          </div>

          {permission?.Project?.includes('project:create') && (
            <Buttons
              primary
              text="Create a project"
              icon={faPlus}
              width="165px"
              height="35px"
              onClick={() => {
                setCurrentVisibilityType(null);
                seteditMode(false);
                setCreateProject(true);
              }}
              hover
            />
          )}
        </div>
        <Headings text="Create and organize your activities into projects to create complete courses." headingType="body2" color="#515151" className="top-heading-detail" />
      </div>
    </>
  );
}

Headline.propTypes = {
  seteditMode: PropTypes.func.isRequired,
  setCreateProject: PropTypes.func.isRequired,
};

/*eslint-disable*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { ProjectPage } from "../../containers/Projects/index.js";
// import foldericon from "assets/images/sidebar/folder-icon.png";
import foldericon from 'assets/images/svg/projectFolder.svg';
import { useSelector } from 'react-redux';
import { setCurrentVisibilityType } from 'store/actions/project';
import Headings from 'curriki-design-system/dist/utils/Headings/headings';
// import MyProjectsCreate from "./MyProjects";

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
          {/* {(currentOrganization?.organization_role === 'Administrator' || currentOrganization?.organization_role === 'Course Creator') && (
          <Link to={`/org/${organization.currentOrganization?.domain}/project/create`}>
            <div className="btn-top-page">
              <FontAwesomeIcon icon="plus" className="mr-2" />
              Create a Project
            </div>
          </Link>
        )} */}
          {/* Update The Code */}
          {permission?.Project?.includes('project:create') && (
            <Link
              to="#"
              onClick={() => {
                setCurrentVisibilityType(null);
                seteditMode(false);
                setCreateProject(true);
              }}
            >
              <div className="btn-top-page">
                <FontAwesomeIcon icon="plus" className="mr-2" />
                Create a Project
              </div>
            </Link>
          )}
        </div>
        <Headings text="Create and organize your activities into projects to create complete courses." headingType="body2" color="#515151" className="top-heading-detail" />
        {/* <p>
          In
          <strong> Projects </strong>
          you can manage each course or program you create.
          <strong> Add a playlist </strong>
          to a<strong> Project </strong>
          and create interactive
          <strong> Activities. </strong>
          <br />
          Once you finish a<strong> Project, Share </strong>
          it with your audience.
        </p> */}
      </div>
    </>
  );
}

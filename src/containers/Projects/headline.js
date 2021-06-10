import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSelector } from 'react-redux';
import { setCurrentVisibilityType } from 'store/actions/project';

export default function Headline() {
  const organization = useSelector((state) => state.organization);
  const { currentOrganization, permission } = organization;
  return (
    <div className="project-headline">
      <div className="title">
        <div>
          Projects
        </div>
        {/* {(currentOrganization?.organization_role === 'Administrator' || currentOrganization?.organization_role === 'Course Creator') && (
          <Link to={`/org/${organization.currentOrganization?.domain}/project/create`}>
            <div className="btn-top-page">
              <FontAwesomeIcon icon="plus" className="mr-2" />
              Create a Project
            </div>
          </Link>
        )} */}
        {permission?.Project?.includes('project:create') && (
          <Link to={`/org/${currentOrganization?.domain}/project/create`} onClick={() => { setCurrentVisibilityType(null); }}>
            <div className="btn-top-page">
              <FontAwesomeIcon icon="plus" className="mr-2" />
              Create a Project
            </div>
          </Link>
        )}
      </div>
      <p>
        In
        <strong> Projects </strong>
        you can manage each course or program you create.
        <strong> Add a playlist </strong>
        to a
        <strong> Project </strong>
        and create interactive
        <strong> Activities. </strong>
        <br />
        Once you finish a
        <strong> Project, Share </strong>
        it with your audience.
      </p>
    </div>
  );
}

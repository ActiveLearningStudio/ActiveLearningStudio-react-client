/* eslint-disable */
import React from 'react';
import Tabview from '../../tabview/Tabview';
import codeSnippet from '!!raw-loader!../../../containers/Admin/userroles';
import userRole from './userRole.png';
import UserRoleStore from '!!raw-loader!../../../store/actions/admin';
import Stylesheetused from '!!raw-loader!../../../containers/Admin/style.scss';
export const UserRole = () => {
  return (
    <>
      <Tabview
        componentName="User Role"
        path="\src\containers\Admin\userrole.js"
        description="In the user role component, you can create a role for every module of the project. You can set roles for projects, playlists, organization, activity, team, groups, etc. For creating roles you will find an accordion for project roles. an accordion for activity role and accordion for all other role permissions.
You have to select checkboxes in each accordion for providing roles to the respective module."
        codeSnippet={codeSnippet}
        libraryUsed={['react-bootstrap', 'react-redux', 'formik']}
        customHooks={[]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[{ path: '/src/store/actions/admin', pathCode: UserRoleStore }]}
        apiUsed={[]}
        images={userRole}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};

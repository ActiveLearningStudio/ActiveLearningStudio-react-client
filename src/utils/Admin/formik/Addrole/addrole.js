/* eslint-disable */
import React from 'react';
import Tabview from '../../../tabview/Tabview';
import Addroleimg from './addrole.PNG';
import AddRoleStoreCode from '!!raw-loader!../../../../store/actions/organization';
import AddRoleSnippet from '!!raw-loader!../../../../containers/Admin/formik/addRole';
import Stylesheetused from '!!raw-loader!../../../../containers/Admin/style.scss';
export const Addrole = () => {
  return (
    <>
      <Tabview
        componentName="Add Role"
        path="src/containers/Admin/formik/addRole.js"
        description="In add role component, you can add a new role. The member account which has permission can set add, edit and delete roles related to the project, activities, playlist, etc. In this component, you can set your organization role like add organization, edit organization, view, invite, update thumb, remove user, and other lots of functionalities which you can set.  In this way, you can add roles related to every module like roles related to project, roles related to activities, and roles related to users."
        codeSnippet={AddRoleSnippet}
        libraryUsed={['react-bootstrap', 'react-redux', 'formik', 'swal']}
        customHooks={[]}
        reduxStore={[
          {
            path: '/src/store/actions/organization',
            pathCode: AddRoleStoreCode,
          },
        ]}
        apiUsed={[]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        images={Addroleimg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};

/* eslint-disable */
import React from 'react';
import Tabview from '../../tabview/Tabview';
import codeSnippet from '!!raw-loader!../../../containers/Admin/index';
import IndexPageimg from './indexPage.png';
import IndexStore from '!!raw-loader!../../../store/actions/admin';
import Stylesheetused from '!!raw-loader!../../../containers/Admin/style.scss';
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Admin\index.js"
        description="This is the component of the index page of the admin module.
        In this component, we have a tab for switching into the different modules. For example, you can switch into organization for showing organization and LMS for  Showing LMS setting.
         There is also a table that shows the details of every module.  If you go to the organization module in the above tab, you will see an image of the organization, Domain, project into this organization, and another lot of information related to the organization module."
        codeSnippet={codeSnippet}
        libraryUsed={['react-bootstrap', 'react-redux', 'react-fontawesome']}
        customHooks={[
          {
            name: './formik/createActivityItem',
            url: '?path=/story/admin-formik-createactivityitem--component',
          },
          {
            name: './formik/createOrg',
            url: '?path=/story/admin-formik-createorg--component',
          },
          {
            name: './formik/addRole',
            url: '?path=/story/admin-formik-addrole--component',
          },
          {
            name: './formik/createuser',
            url: '?path=/story/admin-formik-createuser--component',
          },
          {
            name: './formik/createDefaultSso',
            url: '?path=/story/admin-formik-createdefaultsso--component',
          },
          { name: './pills', url: '?path=/story/admin-pills--component' },
          { name: '/model/EditTeamModel', url: '' },
        ]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[{ path: '/src/store/actions/admin', pathCode: IndexStore }]}
        apiUsed={[]}
        images={IndexPageimg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};

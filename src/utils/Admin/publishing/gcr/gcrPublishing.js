/* eslint-disable */
import React from 'react';
import Tabview from '../../../tabview/Tabview';
import codeSnippet from '!!raw-loader!../../../../containers/Admin/publishing/gcrPublishing';
import GcrPublish from './gcrpublish.png';
import UserRoleStore from '!!raw-loader!../../../../store/actions/organization';

// import Stylesheetused from '!!raw-loader!../../../containers/Admin/style.scss';
export const GcrPublishing = () => {
  return (
    <>
      <Tabview
        componentName="Admin Gcr Publish Setting"
        path="\src\containers\Admin\publishing\gcrPublishing.js"
        description="In this component, you will be able to see design for gcr settings where you can handle project,playlist and activities publish setting. For example if you uncheck project and playlist then you will not be able to see the publish button on project and playlist"
        codeSnippet={codeSnippet}
        libraryUsed={['react-redux', 'formik']}
        customHooks={[]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[{ path: '/src/store/actions/organization', pathCode: UserRoleStore }]}
        apiUsed={[]}
        images={GcrPublish}
        stylesheetUsed=""
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};

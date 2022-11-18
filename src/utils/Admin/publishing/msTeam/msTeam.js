/* eslint-disable */
import React from 'react';
import Tabview from '../../../tabview/Tabview';
import codeSnippet from '!!raw-loader!../../../../containers/Admin/publishing/msTeamPublishing';
import msTeam from './msTeam.png';
import UserRoleStore from '!!raw-loader!../../../../store/actions/organization';

// import Stylesheetused from '!!raw-loader!../../../containers/Admin/style.scss';
export const MsTeam = () => {
  return (
    <>
      <Tabview
        componentName="Admin Microsoft Team Publish Setting"
        path="\src\containers\Admin\publishing\msTeamPublishing.js"
        description="In this component, you will be able to see design for Microsoft Team settings where you can handle project,playlist and activities publish setting. For example if you uncheck project and playlist then you will not be able to see the publish button on project and playlist"
        codeSnippet={codeSnippet}
        libraryUsed={['react-redux', 'formik']}
        customHooks={[]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[{ path: '/src/store/actions/organization', pathCode: UserRoleStore }]}
        apiUsed={[]}
        images={msTeam}
        stylesheetUsed=""
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};

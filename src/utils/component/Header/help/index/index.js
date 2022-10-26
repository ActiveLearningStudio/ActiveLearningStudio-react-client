/* eslint-disable */
import React from 'react';
import Tabview from '../../../../tabview/Tabview';
import codeSnippet from '!!raw-loader!../../../../../components/Header/index';
import IndexPageimg from './Indexheader.png';
import IndexStore from '!!raw-loader!../../../../../store/actions/organization';
import Stylesheetused from '!!raw-loader!../../../../../components/Header/style.scss';
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\components\Header\index.js"
        description="In the index component of the header section, all the components used in the header section will 
    be imported. A dropdown for the profile will also be made where the user name and profile data will be used.
     From this dropdown, you can easily log out and change your username and password."
        codeSnippet={codeSnippet}
        libraryUsed={['react-bootstrap', 'react-redux', 'react-fontawesome', 'react-router-dom', 'prop-types']}
        customHooks={[
          {
            name: '/src/components/Header/multitenancyDropdown',
            url: '?path=/story/component-header-subscription--component',
          },

          {
            name: '/src/components/Header/notification',
            url: '?path=/story/component-header-notification--component',
          },
        ]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[{ path: 'store/actions/organization', pathCode: IndexStore }]}
        apiUsed={[]}
        images={IndexPageimg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio"
      />
    </>
  );
};

/* eslint-disable */
import React from 'react';
import ApiCode from '!!raw-loader!../../../services/admin.service';
import Tabview from '../../tabview/Tabview';
import codeSnippet from '!!raw-loader!../../../containers/Admin/pills';
import PillStore from '!!raw-loader!../../../store/actions/admin';
import Stylesheetused from '!!raw-loader!../../../containers/Admin/style.scss';
export const Pills = () => {
  return (
    <>
      <Tabview
        componentName="Pills"
        path="\src\containers\Admin\pills.js"
        description="This is the component of pill functionality. In this component, you will see all the inner tabs which you are using in the table of the administrate module. 
You can switch to different functions which are used in each table.
You can go to all users, manage roles, and perform other functionalities which are related to every module."
        codeSnippet={codeSnippet}
        libraryUsed={['react-bootstrap', 'react-redux', 'prop-types']}
        customHooks={[
          { name: './starter', url: '' },
          { name: './column', url: '' },
        ]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[{ path: '/src/store/actions/admin', pathCode: PillStore }]}
        apiUsed={[{ path: '/src/services/admin.service', apicode: ApiCode }]}
        images=""
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};

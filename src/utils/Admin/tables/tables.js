/* eslint-disable */
import React from 'react';
import Tabview from '../../tabview/Tabview';
import ApiCode from '!!raw-loader!../../../services/admin.service';
import codeSnippet from '!!raw-loader!../../../containers/Admin/table';
import TablePageimg from './table.png';
import TableStore from '!!raw-loader!../../../store/actions/admin';
import Stylesheetused from '!!raw-loader!../../../containers/Admin/style.scss';
export const Tables = () => {
  return (
    <>
      <Tabview
        componentName="Admin Tables"
        path="\src\containers\Admin\tables.js"
        description="This is the component of the table which are used throughout the project.
In the admin module, when you click on the tab which is showing at the top of the page. 
Then you will get a table where you will find one header of the table and other lots of rows which are showing details of the module.
In the header of the table, you will find the name, domain, admin, project, sub org, and other information related to every module.
"
        codeSnippet={codeSnippet}
        libraryUsed={['react-bootstrap', 'react-redux', 'prop-types', 'react-js-pagination', 'swal']}
        customHooks={[]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[{ path: '/src/store/actions/admin', pathCode: TableStore }]}
        apiUsed={[{ path: '/src/services/admin.service', apicode: ApiCode }]}
        images={TablePageimg}
        stylesheetUsed={Stylesheetused}
        examples="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};

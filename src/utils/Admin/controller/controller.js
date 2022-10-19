/* eslint-disable */
import React from 'react';
import Tabview from '../../tabview/Tabview';
import codeSnippet from '!!raw-loader!../../../containers/Admin/controller';
import controllerimg from './controllerimg.png';
import ControllerStore from '!!raw-loader!../../../store/actions/admin';
import ApiCode from '!!raw-loader!../../../services/admin.service';
import Stylesheetused from '!!raw-loader!../../../containers/Admin/style.scss';
export const Controller = () => {
  return (
    <>
      <Tabview
        componentName="Controller"
        path="\src\containers\Admin\controller.js"
        description="This is the controller component, which is used to control stats, projects, organization, users, etc. 
         In the controller panel, you will see a tab for managing projects, activities, users, etc.
If you click on organization, then organization data will be shown below in the table. 
If you click on the project then all the data related to your project will be shown in the table.
 In this from your o, you can see all other tabs data.
In the data panel, there is a dropdown where you can set your entries how much you want to show in 
the table. you can also set a filter on the data where you can filter through members, users,
 organizations, etc.
In the user's controller page, on the top right corner, you can also add a new user from your 
organization, from your team, or add an external user."
        codeSnippet={codeSnippet}
        libraryUsed={['react-bootstrap', 'react-redux', 'react-fontawesome', 'prop-types', 'swal']}
        customHooks={[
          {
            name: '/src/components/ResourceCard/AddResource/dropdownData',
            url: '',
          },
          {
            name: 'filter',
            url: '',
          },
        ]}
        reduxStore={[{ path: '/src/store/actions/admin', pathCode: ControllerStore }]}
        apiUsed={[{ path: '/src/services/admin.service', apicode: ApiCode }]}
        stylesheetUsed={Stylesheetused}
        images={controllerimg}
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};

/* eslint-disable */
import React from 'react';
import Tabview from '../../tabview/Tabview';
import CodeSnippet from '!!raw-loader!../../../components/DeletePopup/index';
import DelPopup from './deletepopup.png';
import Stylesheetused from '!!raw-loader!../../../components/DeletePopup/style.scss';
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="DeletePopup"
        path="\src\components\DeletePopup\index.js"
        description="This component will help you to delete the playlist,
         through a popup modal. When you click on the delete playlist button 
         then you will see a popup modal where a message will appear to confirm your action.
          If you are sure to delete the playlist then click on the delete button then your 
          playlist will be deleted."
        codeSnippet={CodeSnippet}
        libraryUsed={['prop-types']}
        customHooks={[
          {
            name: '/src/utils/index',
            url: '?path=/story/utils-index--component',
          },
        ]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[]}
        apiUsed={[]}
        images={DelPopup}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/project/8654"
      />
    </>
  );
};

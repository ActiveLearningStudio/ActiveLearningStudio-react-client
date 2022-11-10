/* eslint-disable */
import React from 'react';
import Tabview from '../../tabview/Tabview';
import CodeSnippet from '!!raw-loader!../../../containers/CreateActivity/SearchActivity';
import StoreSnippet from '!!raw-loader!../../../store/actions/resource';
export const SearchAActivity = () => {
  return (
    <>
      <Tabview
        componentName="Search Activity"
        path="\src\containers\CreateActivity\SearchActivity.js"
        description="In this component, you can search any type of activity and then after that you can preview that activity and then perform actions."
        codeSnippet={CodeSnippet}
        libraryUsed={['swal', 'formik', 'react-redux']}
        customHooks={
          [
            // {name:'/src/utils/index',url:'www.google.com'},
          ]
        }
        reduxStore={[{ path: '/src/store/actions/resource', pathCode: StoreSnippet }]}
        apiUsed={[]}
        images=""
        stylesheetUsed=""
        example="https://dev.currikistudio.org/org/currikistudio/project/6031/playlist/12875/activity/create"
      />
    </>
  );
};

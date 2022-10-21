/* eslint-disable */
import React from 'react';
import Tabview from '../tabview/Tabview';
import CodeSnippet from '!!raw-loader!../../containers/CreateActivity/index';
import StoreSnippet from '!!raw-loader!../../store/actions/resource';
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Search Index"
        path="\src\containers\CreateActivity\index.js"
        description="In this component, all other components like search Activity, activityMeter and uploadActivity will be called and merged here to make a user interface for create activity."
        codeSnippet={CodeSnippet}
        libraryUsed={['prop-types', 'react-bootstrap', 'prop-types', 'react-router-dom']}
        customHooks={
          [
            // {name:'/src/utils/index',url:'www.google.com'},
          ]
        }
        reduxStore={[]}
        apiUsed={[]}
        images=""
        stylesheetUsed=""
        example="https://dev.currikistudio.org/org/currikistudio/project/6031/playlist/12875/activity/create"
      />
    </>
  );
};

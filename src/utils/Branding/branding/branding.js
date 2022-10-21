/* eslint-disable */
import React from 'react';
import Tabview from '../../tabview/Tabview';
import CodeSnippet from '!!raw-loader!../../../containers/Branding/index';

import Stylesheetused from '!!raw-loader!../../../containers/Branding/style.scss';
import StoreSnippet from '!!raw-loader!../../../store/actions/auth';
export const Branding = () => {
  return (
    <>
      <Tabview
        componentName="Branding"
        path="\src\containers\Branding\index.js"
        description="This is the component for branding the whole curriki studio. If you go the admin panel then in organization tab, edit organization and you will be able to see the a new interface wjhere you can change the brancing like color, font family and font-sizes etc. In this way thorugh this component, you can change the entire look of the curriki studio."
        codeSnippet={CodeSnippet}
        libraryUsed={['react-fontawesome', 'react-router-dom', 'react-bootstrap']}
        customHooks={[]}
        reduxStore={[]}
        apiUsed={[]}
        images=""
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/forgot-password"
      />
    </>
  );
};

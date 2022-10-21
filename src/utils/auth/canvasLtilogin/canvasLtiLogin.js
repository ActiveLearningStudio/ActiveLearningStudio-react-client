/* eslint-disable */
import React from 'react';
import Tabview from '../../tabview/Tabview';
import CodeSnippet from '!!raw-loader!../../../containers/Auth/CanvasLtiLogin';

import Stylesheetused from '!!raw-loader!../../../containers/Auth/style.scss';
import StoreSnippet from '!!raw-loader!../../../store/actions/auth';
export const CanvasLtiLogin = () => {
  return (
    <>
      <Tabview
        componentName="Canvas Lti Login"
        path="\src\containers\Auth\CanvasLtiLogin.js"
        description="This is the description of the canvas lti login. In this component, you will be able to handle lti sso login."
        codeSnippet={CodeSnippet}
        libraryUsed={['react-redux', 'prop-types', 'query-string', 'react-router-dom', 'swal']}
        customHooks={[]}
        reduxStore={[{ path: '/src/store/actions/auth', pathCode: StoreSnippet }]}
        apiUsed={[]}
        images=""
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/forgot-password"
      />
    </>
  );
};

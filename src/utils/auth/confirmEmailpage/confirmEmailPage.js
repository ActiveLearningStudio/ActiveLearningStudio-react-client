/* eslint-disable */
import React from 'react';
import Tabview from '../../tabview/Tabview';
import CodeSnippet from '!!raw-loader!../../../containers/Auth/ConfirmEmailPage';

import Stylesheetused from '!!raw-loader!../../../containers/Auth/style.scss';
import StoreSnippet from '!!raw-loader!../../../store/actions/auth';
export const ConfirmEmail = () => {
  return (
    <>
      <Tabview
        componentName="Confirm Email"
        path="\src\containers\Auth\ConfirmEmailPage.js"
        description="This component will be called when you will send request for creating new user on currriki studio. Then you will recieve a new email and when you will click on that link then page will redirect on confrim email page. Then this component will render."
        codeSnippet={CodeSnippet}
        libraryUsed={['react-redux', 'prop-types', 'query-string', 'react-router-dom', 'swal']}
        customHooks={[]}
        reduxStore={[{ path: '/src/store/actions/auth', pathCode: StoreSnippet }]}
        apiUsed={[]}
        images=""
        stylesheetUsed={Stylesheetused}
        example=""
      />
    </>
  );
};

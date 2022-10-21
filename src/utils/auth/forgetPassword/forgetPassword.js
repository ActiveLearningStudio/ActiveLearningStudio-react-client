/* eslint-disable */
import React from 'react';
import Tabview from '../../tabview/Tabview';
import CodeSnippet from '!!raw-loader!../../../containers/Auth/ForgotPasswordPage';
import ForgetPasswordImg from './ForgetPassword.png';
import Stylesheetused from '!!raw-loader!../../../containers/Auth/style.scss';
import StoreSnippet from '!!raw-loader!../../../store/actions/auth';
export const ForgetPassword = () => {
  return (
    <>
      <Tabview
        componentName="ForgetPasswordPage"
        path="\src\containers\Auth\ForgetPasswordPage.js"
        description="This is the description of Forget password component.
          In this component, you can reset your password if you have forgotten
           your password. In the login panel. you will see forget password link. 
           Click on the link, enter your email and click on send reset password link.
        After clicking on this, you will get a reset password link in your email.
          By clicking on the link in the email, update your password, and then log in again."
        codeSnippet={CodeSnippet}
        libraryUsed={['react-redux', 'prop-types', 'react-fontawesome', 'react-router-dom', 'validator', 'swal']}
        customHooks={[
          { name: '/src/containers/Auth/Error', url: '' },
          {
            name: '/src/containers/Auth/Logo',
            url: '?path=/story/auth-logo--component',
          },
        ]}
        reduxStore={[{ path: '/src/store/actions/auth', pathCode: StoreSnippet }]}
        apiUsed={[]}
        images={ForgetPasswordImg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/forgot-password"
      />
    </>
  );
};

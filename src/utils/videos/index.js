/* eslint-disable */
import React from 'react';
import Tabview from '../tabview/Tabview';
import CodeSnippet from '!!raw-loader!../../containers/Videos/index.js';
import ForgetPasswordImg from './videoIndex.png';
import Stylesheetused from '!!raw-loader!../../containers/Videos/style.scss';
import StoreSnippet from '!!raw-loader!../../store/actions/videos';
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Videos\index.js"
        description="This is the index component of video module. In studio, you will be able to see the add video to activity and interactive video. And on index component, all other add vidoe and describe video components will be merged. In this way, you will be able to see the activity view."
        codeSnippet={CodeSnippet}
        libraryUsed={['react-redux', 'react-bootstrap', 'react-router-dom', 'react-js-pagination', 'swal']}
        customHooks={[
          { name: './formik/describevideo', url: '' },
          {
            name: './formik/addvideo',
            url: '?path=/story/auth-logo--component',
          },
          {
            name: 'components/models/GoogleLoginModal',
            url: '',
          },
        ]}
        reduxStore={[{ path: '/src/store/actions/videos', pathCode: StoreSnippet }]}
        apiUsed={[]}
        images={ForgetPasswordImg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/activities"
      />
    </>
  );
};

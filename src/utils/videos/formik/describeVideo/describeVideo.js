/* eslint-disable */
import React from 'react';
import Tabview from '../../../tabview/Tabview';
import CodeSnippet from '!!raw-loader!../../../../containers/Videos/formik/describevideo.js';
import DescribeVideoPng from './describeVideo.png';
import Stylesheetused from '!!raw-loader!../../../../containers/Videos/style.scss';
import StoreSnippet from '!!raw-loader!../../../../store/actions/admin';
export const DescribeVideo = () => {
  return (
    <>
      <Tabview
        componentName="DescribeVideo"
        path="\src\containers\Videos\formik\describevideo.js"
        description="In this component, you will describe the description of the video like video title, vide details, video thumbnail etc. You will also see the screenshot added in screenshot tab"
        codeSnippet={CodeSnippet}
        libraryUsed={['react-redux', 'formik']}
        customHooks={[{ name: 'containers/MyProject/model/previewlayout', url: '' }]}
        reduxStore={[{ path: '/src/store/actions/admin', pathCode: StoreSnippet }]}
        apiUsed={[]}
        images={DescribeVideoPng}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/activities"
      />
    </>
  );
};

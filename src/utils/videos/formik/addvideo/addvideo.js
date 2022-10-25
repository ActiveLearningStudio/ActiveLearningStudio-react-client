/* eslint-disable */
import React from 'react';
import Tabview from '../../../tabview/Tabview';
import CodeSnippet from '!!raw-loader!../../../../containers/Videos/formik/addvideo.js';
import AddvideoPng from './addVideo.png';
import Stylesheetused from '!!raw-loader!../../../../containers/Videos/style.scss';
import StoreSnippet from '!!raw-loader!../../../../store/actions/admin';
export const AddVideo = () => {
  return (
    <>
      <Tabview
        componentName="AddVideo"
        path="\src\containers\Videos\formik\addvideo.js"
        description="This component is used in activity module. During activity creation you will see the option for add video where you will add video through different type of video soruce. So that part of user interface is develop through this component."
        codeSnippet={CodeSnippet}
        libraryUsed={['react-redux', 'react-bootstrap', 'formik']}
        customHooks={[{ name: '../model/brightmodel', url: '' }]}
        reduxStore={[{ path: '/src/store/actions/admin', pathCode: StoreSnippet }]}
        apiUsed={[]}
        images={AddvideoPng}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/activities"
      />
    </>
  );
};

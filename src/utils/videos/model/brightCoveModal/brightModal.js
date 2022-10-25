/* eslint-disable */
import React from 'react';
import Tabview from '../../../tabview/Tabview';
import CodeSnippet from '!!raw-loader!../../../../containers/Videos/formik/addvideo.js';
import AddvideoPng from './brightModal.png';
import Stylesheetused from '!!raw-loader!../../../../containers/Videos/model/style.scss';
import StoreSnippet from '!!raw-loader!../../../../store/actions/videos';
export const BrightModal = () => {
  return (
    <>
      <Tabview
        componentName="BrightModal"
        path="\src\containers\Videos\model\brightmodel.js"
        description="When you click on browse video on add video page.You will see the modal where you will be able to add video through browsing different sources like brightcove, kaltura etc. So the user interface of that mnodal is developed through this component."
        codeSnippet={CodeSnippet}
        libraryUsed={['react-bootstrap', 'prop-types', 'react-fontawesome', 'react-redux']}
        customHooks={[]}
        reduxStore={[{ path: '/src/store/actions/videos', pathCode: StoreSnippet }]}
        apiUsed={[]}
        images={AddvideoPng}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/activities"
      />
    </>
  );
};

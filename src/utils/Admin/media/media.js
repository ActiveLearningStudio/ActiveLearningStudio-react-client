/* eslint-disable */
import React from 'react';
import Tabview from '../../tabview/Tabview';
import codeSnippet from '!!raw-loader!../../../containers/Admin/media';
import mediaImg from './mediaImg.png';
import MediaStore from '!!raw-loader!../../../store/actions/admin';
import Stylesheetused from '!!raw-loader!../../../containers/Admin/style.scss';
export const Media = () => {
  return (
    <>
      <Tabview
        componentName="Media"
        path="\src\containers\Admin\media.js"
        description="This is the media component, which is used to update video sources, image sources from the admin panel. You will find this component under admin > integeration tab > and then media sources."
        codeSnippet={codeSnippet}
        libraryUsed={['react-bootstrap', 'react-redux', 'swal']}
        customHooks={[]}
        reduxStore={[{ path: '/src/store/actions/admin', pathCode: MediaStore }]}
        apiUsed={[]}
        stylesheetUsed={Stylesheetused}
        images={mediaImg}
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};

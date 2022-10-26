/* eslint-disable */
import React from 'react';
import Tabview from '../../../../../../tabview/Tabview';
import CodeSnippet from '!!raw-loader!../../../../../../../components/ResourceCard/AddResource/Editors/TinyEditor';
import ResourceStore from '!!raw-loader!../../../../../../../store/actions/resource';
import Stylesheetused from '!!raw-loader!../../../../../../../components/ResourceCard/AddResource/style.scss';
export const TinyEditor = () => {
  return (
    <>
      <Tabview
        componentName="TinyEditor"
        path="\src\components\ResourceCard\AddResource\Editors\TinyEditor.js"
        description="The tiny editor is the same as the H5P editor but this is used to display data of immersive reader resources.
         When we need to display data then this component will be used to load resource data in 
         the tiny editor through an iframe."
        codeSnippet={CodeSnippet}
        libraryUsed={['prop-types', 'react-redux', 'react-router-dom', 'tinymce-react']}
        customHooks={[]}
        reduxStore={[{ path: '/src/store/actions/resource', pathCode: ResourceStore }]}
        apiUsed={[]}
        images=""
        stylesheetUsed={Stylesheetused}
        example=""
      />
    </>
  );
};

/* eslint-disable */
import React from 'react';
import Tabview from '../../tabview/Tabview';
import IndexSnippet from '!!raw-loader!../../../containers/Search/CloneModel.js';
import Searchimg from './clomeModal.png';
import IndexStore from '!!raw-loader!../../../store/actions/search';
import IndexStyle from '!!raw-loader!../../../containers/Search/style.scss';
export const CloneModel = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Search\CloneModel.js"
        description="This component is used for making clone of any ind.Actviity or project through search library.
        YOu will clcik on copy to projecs then thsi model will be opened where you will be able to move
         activity into existing playlist or create new project."
        codeSnippet={IndexSnippet}
        libraryUsed={['prop-types', 'react-redux', 'react-fontawesome', 'swal', 'react-bootstrap']}
        customHooks={[
          {
            name: 'containers/Projects/CreateProjectPopup',
            url: '',
          },
        ]}
        reduxStore={[{ path: '/src/store/actions/search', pathCode: IndexStore }]}
        apiUsed={[]}
        images={Searchimg}
        stylesheetUsed={IndexStyle}
        example="https://dev.currikistudio.org/org/currikistudio/search"
      />
    </>
  );
};

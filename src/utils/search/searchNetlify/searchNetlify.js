/* eslint-disable */
import React from 'react';
import Tabview from '../../tabview/Tabview';
import IndexSnippet from '!!raw-loader!../../../containers/Search/SearchNetlify.js';
import Searchimg from './netlfiySearch.png';
import IndexStore from '!!raw-loader!../../../store/actions/search';
import IndexStyle from '!!raw-loader!../../../containers/Search/style.scss';
export const SearchNetlify = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Search\SearchNetlify.js"
        description="This is the main search component which have two tabs,e.g  independant activity and project search. when enter any  search keyword or refine your search then you will be able to see search result then you cna perform multiple actions there like copy to project and preview that activity or project."
        codeSnippet={IndexSnippet}
        libraryUsed={['prop-types', 'react-redux', 'react-fontawesome', 'swal', 'react-js-pagination', 'react-bootstrap']}
        customHooks={[
          {
            name: 'components/ResourceCard/AddResource/dropdownData',
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

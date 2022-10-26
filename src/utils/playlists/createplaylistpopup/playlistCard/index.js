/* eslint-disable */
import React from 'react';
import Tabview from '../../../tabview/Tabview';
import codeSnippet from '!!raw-loader!../../../../containers/Playlists/PlaylistCard/index';
import PlaylistCard from './playlistCard.png';
import CardStore from '!!raw-loader!../../../../store/actions/resource';
import Stylesheetused from '!!raw-loader!../../../../containers/Playlists/PlaylistCard/style.scss';
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Playlists\playlisCard\index.js"
        description="This is the component for showing playlists in the card. 
    It means that only one component is created for displaying playlist data 
    in card shape. when you want to show playlist data in the card list then every
     time this component will be called and playlist data will be shown in card shape. 
     In the card,you will see the title of the playlist and then the list of activities 
     related to that playlist."
        codeSnippet={codeSnippet}
        libraryUsed={['react-bootstrap', 'react-redux', 'react-fontawesome', 'react-router-dom', 'prop-types', 'swal', 'react-beautiful-dnd']}
        customHooks={[{ name: '/src/components/ResourceCard/index', url: '' }]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[{ path: '/src/store/actions/resource', pathCode: CardStore }]}
        apiUsed={[]}
        images={PlaylistCard}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/project/"
      />
    </>
  );
};

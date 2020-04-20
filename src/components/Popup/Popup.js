import React, {useEffect, useCallback} from "react";
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import './Popup.scss'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const fadeAnimation = keyframes `${fadeIn}`;

const FaceDiv = styled.div`
  animation: 1s ${fadeAnimation};
`;

function Popup(props) {

  //remoe popup when escape is pressed
  const escFunction = useCallback((event) => {
    if(event.keyCode === 27) {
      props.handleHideCreatePlaylistModal(event);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
}, []);
  return (
    <FaceDiv className='popup'>
        <form onSubmit={props.handleCreatePlaylistSubmit}>
            <div className="modal fade" id="createPlaylistModal"  role="dialog" aria-labelledby="createPlaylistModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-body">
                        <input type="text" name="playlistName" className="playlistName form-control" autoComplete="off" placeholder="Enter playlist title..." onChange={props.onPlaylistTitleChange} />
                    </div>
                    <div className="modal-footer">

                      <button type="submit" className="btn btn-primary add-playlist-btn">Add</button>
                      <button type="button" className="close-playlist-btn" data-dismiss="modal" onClick={props.handleHideCreatePlaylistModal}>x</button>
                    </div>
                  </div>
                </div>
          </div>
      </form>
    </FaceDiv> 
  );
}

export default Popup;
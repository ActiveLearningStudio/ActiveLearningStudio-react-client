import React, {useEffect, useCallback} from "react";
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import './DeletePopup.scss'

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
  console.log(props);
  //remoe popup when escape is pressed
  const escFunction = useCallback((event) => {
    if(event.keyCode === 27) {
      props.hideDeletePlaylistModalAction(event);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
}, []);
console.log(props);
  return (
    <FaceDiv className='popup'>
          <div className="modal fade" id="createPlaylistModal"  role="dialog" aria-labelledby="createPlaylistModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-body">
                  <h5>Delete "{props.ui.title}"?</h5>
                  <p>You're about to permanently delete this {props.ui.deleteType}</p>
                  <p>Do you want to continue?</p>
                  </div>
                  <div className="modal-footer">
                  {
                    props.ui.deleteType == 'Project' ?
                    <button type="submit" className="btn btn-sm btn-danger" onClick={()=>{props.deleteProjectAction(props.ui.id);}}>Delete</button>
                    :
                    null
                  }
                  {
                    props.ui.deleteType == 'Playlist' ?
                    <button type="submit" className="btn btn-sm btn-danger" onClick={()=>{props.deletePlaylistAction(props.ui.id);}}>Delete</button>
                    :
                    null
                  }
                  {
                    props.ui.deleteType == 'Activity' ?
                    <button type="submit" className="btn btn-sm btn-danger" onClick={()=>{props.deleteResourceAction(props.ui.id);}}>Delete</button>
                    :
                    null
                  }
                    
                    <button type="button" className="btn btn-sm btn-default" data-dismiss="modal" onClick={props.hideDeletePlaylistModalAction}>Cancel</button>
                  </div>
                </div>
              </div>
        </div>
    </FaceDiv> 
  );
}

export default Popup;
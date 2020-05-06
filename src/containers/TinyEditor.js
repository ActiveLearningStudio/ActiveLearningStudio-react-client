import React from "react";
import { connect } from "react-redux";
import validator from "validator";

import { useLocation } from 'react-router-dom'
import { createPlaylist } from "./../actions/playlist";

import { Editor } from '@tinymce/tinymce-react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";




export class TinyEditor extends React.Component {
  constructor(props) {
    super(props);

    
    this.state = {
      email: "",
      password: "",
      error: "",
      playlists:[
      ],
      title:""
    };

    
  }

  handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  }
  
  render() {

      
    return (
      <div className="post">
        <h1>New Post</h1>
        <div className="post-title">
          <label>
            <span>Title</span>
            <input type="text" name="title" className="form-control" />
          </label>
        </div>
        <div className="post-title">
          <label>
            <span>Content</span>
            <Editor
              apiKey='alzppk5y87xyqziy9mfltp1e63bg9jexd40he2sfraajyr1q'
              initialValue="<p>This is the initial content of the editor</p>"
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help'
              }}
              onEditorChange={this.handleEditorChange}
            />
          </label>
        </div>
        <div className="form-group">
            <div className="col-md-9 col-md-offset-3">
              <button type="submit" className="add-resource-submit-btn" onClick={this.handleH5PSubmit}>Finish</button>
            </div>
        </div>
      </div>
      
      
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createPlaylist: (title) => dispatch(createPlaylist(title))
});

const mapStateToProps =(state) => {
  return {
    
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TinyEditor);



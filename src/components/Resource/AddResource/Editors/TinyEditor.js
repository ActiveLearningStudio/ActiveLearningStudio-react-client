import React from "react";
import { connect } from "react-redux";
import validator from "validator";
import { withRouter } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import { saveGenericResourceAction } from "../../../../actions/resource";

export class TinyEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title:"",
      textcontent:""
    };
  }

  handleEditorChange = (content, editor) => {
    this.setState({textcontent: content});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Content was updated:'+ this.state.textcontent);

    this.props.saveGenericResourceAction({
      playlistid: this.props.match.params.playlistid,
      mysqlid: null,
      type: this.props.resource.newResource.activity.type,
      metadata: this.props.resource.newResource.metadata,
      textcontent: this.state.textcontent
    });
  }
  
  render() {
    return (
      <div className="post">
        <h1>New Immersive Reader Resource</h1>
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
              <button type="submit" className="add-resource-submit-btn" onClick={this.handleSubmit}>Finish</button>
            </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveGenericResourceAction: (resourceData) => dispatch(saveGenericResourceAction(resourceData))
});

const mapStateToProps =(state) => {
  return {
    
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TinyEditor)
);


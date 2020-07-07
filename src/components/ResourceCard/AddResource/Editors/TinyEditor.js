/* eslint-disable max-len */
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

// TODO: need to convert to functional component
// set API key via .env.local
export class TinyEditor extends React.Component {
  handleEditorChange = (content) => {
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
              apiKey="alzppk5y87xyqziy9mfltp1e63bg9jexd40he2sfraajyr1q"
              initialValue="<p>This is the initial content of the editor</p>"
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor alignleft aligncenter alignright alignjustify bullist numlist outdent indent | removeformat | help',
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

export default TinyEditor;

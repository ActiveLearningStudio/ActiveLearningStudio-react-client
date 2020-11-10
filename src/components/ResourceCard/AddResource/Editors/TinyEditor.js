/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

import { saveGenericResourceAction } from 'store/actions/resource';

// TODO: need to convert to functional component
// set API key via .env.local
class TinyEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textContent: '',
    };
  }

  handleEditorChange = (content) => {
    this.setState({ textContent: content });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { textContent } = this.state;
    const { match, resource, saveGenericResource } = this.props;

    saveGenericResource({
      playlistId: match.params.playlistId,
      mysqlId: null,
      type: resource.newResource.activity.type,
      metadata: resource.newResource.metadata,
      textContent,
    });
  }

  render() {
    return (
      <div className="post">
        <div className="form-group" style={{ position: 'inherit' }}>
          <div className="col-md-9 col-md-offset-3" style={{ position: 'inherit' }}>
            <button
              type="submit"
              className="add-resource-submit-btn top"
              onClick={this.handleSubmit}
            >
              Save & Exit
            </button>
          </div>
        </div>

        <h1>New Immersive Reader Resource</h1>

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
            <button
              type="submit"
              className="add-resource-submit-btn"
              onClick={this.handleSubmit}
            >
              Save & Exit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

TinyEditor.propTypes = {
  match: PropTypes.object.isRequired,
  resource: PropTypes.object.isRequired,
  saveGenericResource: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveGenericResource: (resourceData) => dispatch(saveGenericResourceAction(resourceData)),
});

export default withRouter(
  connect(null, mapDispatchToProps)(TinyEditor),
);

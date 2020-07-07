import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

// TODO: convert to functional component
// move out the API call to actions or services
class H5PEditor extends React.Component {
  constructor(props) {
    super(props);

    // this.h5pLib = props.resource.newResource.activity.h5pLib; // "H5P.Audio 1.4";
    // this.h5pLib = 'H5P.InteractiveVideo 1.21';

    this.state = {
      submitAction: 'create',
      // h5pFile: null,
      // h5pLib: 'H5P.InteractiveVideo 1.21',
      // eslint-disable-next-line max-len
      // h5pParams: "{&quot;params&quot;:{&quot;interactiveVideo&quot;:{&quot;video&quot;:{&quot;startScreenOptions&quot;:{&quot;title&quot;:&quot;Interactive Video&quot;,&quot;hideStartTitle&quot;:false},&quot;textTracks&quot;:{&quot;videoTrack&quot;:[{&quot;label&quot;:&quot;Subtitles&quot;,&quot;kind&quot;:&quot;subtitles&quot;,&quot;srcLang&quot;:&quot;en&quot;}]},&quot;files&quot;:[{&quot;path&quot;:&quot;https:\/\/www.youtube.com\/watch?v=XI641BhgOnI&quot;,&quot;mime&quot;:&quot;video\/YouTube&quot;,&quot;copyright&quot;:{&quot;license&quot;:&quot;U&quot;}}]},&quot;assets&quot;:{},&quot;summary&quot;:{&quot;task&quot;:{&quot;library&quot;:&quot;H5P.Summary 1.10&quot;,&quot;params&quot;:{&quot;intro&quot;:&quot;Choose the correct statement.&quot;,&quot;summaries&quot;:[{&quot;subContentId&quot;:&quot;ff6e0e78-49a5-47b5-b50e-2c36efde0568&quot;,&quot;tip&quot;:&quot;&quot;}],&quot;overallFeedback&quot;:[{&quot;from&quot;:0,&quot;to&quot;:100}],&quot;solvedLabel&quot;:&quot;Progress:&quot;,&quot;scoreLabel&quot;:&quot;Wrong answers:&quot;,&quot;resultLabel&quot;:&quot;Your result&quot;,&quot;labelCorrect&quot;:&quot;Correct.&quot;,&quot;labelIncorrect&quot;:&quot;Incorrect! Please try again.&quot;,&quot;alternativeIncorrectLabel&quot;:&quot;Incorrect&quot;,&quot;labelCorrectAnswers&quot;:&quot;Correct answers.&quot;,&quot;tipButtonLabel&quot;:&quot;Show tip&quot;,&quot;scoreBarLabel&quot;:&quot;You got :num out of :total points&quot;,&quot;progressText&quot;:&quot;Progress :num of :total&quot;},&quot;subContentId&quot;:&quot;f8b52010-0902-4f3d-9396-8387036a36b6&quot;,&quot;metadata&quot;:{&quot;contentType&quot;:&quot;Summary&quot;,&quot;license&quot;:&quot;U&quot;,&quot;title&quot;:&quot;Untitled Summary&quot;}},&quot;displayAt&quot;:3}},&quot;override&quot;:{&quot;autoplay&quot;:false,&quot;loop&quot;:false,&quot;showBookmarksmenuOnLoad&quot;:false,&quot;showRewind10&quot;:false,&quot;preventSkipping&quot;:false,&quot;deactivateSound&quot;:false},&quot;l10n&quot;:{&quot;interaction&quot;:&quot;Interaction&quot;,&quot;play&quot;:&quot;Play&quot;,&quot;pause&quot;:&quot;Pause&quot;,&quot;mute&quot;:&quot;Mute&quot;,&quot;unmute&quot;:&quot;Unmute&quot;,&quot;quality&quot;:&quot;Video Quality&quot;,&quot;captions&quot;:&quot;Captions&quot;,&quot;close&quot;:&quot;Close&quot;,&quot;fullscreen&quot;:&quot;Fullscreen&quot;,&quot;exitFullscreen&quot;:&quot;Exit Fullscreen&quot;,&quot;summary&quot;:&quot;Open summary dialog&quot;,&quot;bookmarks&quot;:&quot;Bookmarks&quot;,&quot;endscreen&quot;:&quot;Submit screen&quot;,&quot;defaultAdaptivitySeekLabel&quot;:&quot;Continue&quot;,&quot;continueWithVideo&quot;:&quot;Continue with video&quot;,&quot;playbackRate&quot;:&quot;Playback Rate&quot;,&quot;rewind10&quot;:&quot;Rewind 10 Seconds&quot;,&quot;navDisabled&quot;:&quot;Navigation is disabled&quot;,&quot;sndDisabled&quot;:&quot;Sound is disabled&quot;,&quot;requiresCompletionWarning&quot;:&quot;You need to answer all the questions correctly before continuing.&quot;,&quot;back&quot;:&quot;Back&quot;,&quot;hours&quot;:&quot;Hours&quot;,&quot;minutes&quot;:&quot;Minutes&quot;,&quot;seconds&quot;:&quot;Seconds&quot;,&quot;currentTime&quot;:&quot;Current time:&quot;,&quot;totalTime&quot;:&quot;Total time:&quot;,&quot;singleInteractionAnnouncement&quot;:&quot;Interaction appeared:&quot;,&quot;multipleInteractionsAnnouncement&quot;:&quot;Multiple interactions appeared.&quot;,&quot;videoPausedAnnouncement&quot;:&quot;Video is paused&quot;,&quot;content&quot;:&quot;Content&quot;,&quot;answered&quot;:&quot;@answered answered&quot;,&quot;endcardTitle&quot;:&quot;@answered Question(s) answered&quot;,&quot;endcardInformation&quot;:&quot;You have answered @answered questions, click below to submit your answers.&quot;,&quot;endcardInformationNoAnswers&quot;:&quot;You have not answered any questions.&quot;,&quot;endcardInformationMustHaveAnswer&quot;:&quot;You have to answer at least one question before you can submit your answers.&quot;,&quot;endcardSubmitButton&quot;:&quot;Submit Answers&quot;,&quot;endcardSubmitMessage&quot;:&quot;Your answers have been submitted!&quot;,&quot;endcardTableRowAnswered&quot;:&quot;Answered questions&quot;,&quot;endcardTableRowScore&quot;:&quot;Score&quot;,&quot;endcardAnsweredScore&quot;:&quot;answered&quot;,&quot;endCardTableRowSummaryWithScore&quot;:&quot;You got @score out of @total points for the @question that appeared after @minutes minutes and @seconds seconds.&quot;,&quot;endCardTableRowSummaryWithoutScore&quot;:&quot;You have answered the @question that appeared after @minutes minutes and @seconds seconds.&quot;}},&quot;metadata&quot;:{&quot;title&quot;:&quot;ABC https:\/\/www.youtube.com\/watch?v=XI641BhgOnI&quot;,&quot;license&quot;:&quot;U&quot;}}"
    };
  }

  componentDidMount() {
    // this.setH5PIntegrationVariable();
  }

  // setH5pFileUpload = (e) => {
  //   this.setState({ h5pFile: e.target.files[0] });
  // }

  onSubmitActionRadioChange = (e) => {
    this.setState({ submitAction: e.currentTarget.value });
  }

  submitResource = (event) => {
    event.preventDefault();

    const { match, resource, handleEditResourceSubmit } = this.props;
    // let payload = { event, submitAction: this.state.submitAction, h5pFile: this.state.h5pFile };
    handleEditResourceSubmit(
      match.params.playlistId,
      resource.editResource.h5pLib,
      resource.editResource.h5pLibType,
      match.params.activityId,
      resource.editResource.metadata,
    );
  }

  // setup h5p integration variable for EditResource
  setH5PIntegrationVariable = () => {
    const { token } = JSON.parse(localStorage.getItem('auth'));
    axios.get(`${global.config.laravelAPIUrl}/h5p-settings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        window.H5PIntegration = response.data.data.h5p.settings;

        response.data.data.h5p.settings.editor.assets.js.forEach((value) => {
          const script = document.createElement('script');
          script.src = value;
          script.async = false;
          document.body.appendChild(script);
        });
      });
  }

  handleH5PSubmit = () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'JWT fefege...',
    };
    const data = {
      library: window.h5peditorCopy.getLibrary(),
      parameters: JSON.stringify(window.h5peditorCopy.getParams()),
      action: 'create',
    };
    axios.post(`${global.config.h5pAjaxUrl}/h5p/?api_token=test`, data, {
      headers,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    return false;
  };

  render() {
    const { submitAction } = this.state;
    const { h5pParams, h5pLib } = this.props;

    if (h5pParams === '') {
      return (
        <>
        </>
      );
    }

    // TODO: need to remove const token
    return (
      <>
        <form
          method="POST"
          action={`${global.config.h5pAjaxUrl}/h5p`}
          acceptCharset="UTF-8"
          className="form-horizontal"
        >
          <input name="_token" type="hidden" value="B6TFsmFD5TLZaWCAYZ91ly0D2We0xjLAtRmBJzQT" />
          <input type="hidden" name="library" value={h5pLib} />
          <input type="hidden" name="parameters" value={h5pParams} />

          <fieldset>

            <div className="form-group">
              <div className="col-md-12">
                <div>
                  <div>Loading...</div>
                </div>
              </div>
            </div>

            {/*
            <div className="form-group laravel-h5p-upload-container">
              <label htmlFor="inputUpload" className="control-label col-md-3">Upload</label>
              <div className="col-md-12">
                <input
                  type="file"
                  name="h5p_file"
                  id="h5p-file"
                  className="laravel-h5p-upload form-control"
                  onChange={this.setH5pFileUpload}
                />

                <small className="h5p-disable-file-check helper-block">
                  <label className="">
                    <input type="checkbox" name="h5p_disable_file_check" id="h5p-disable-file-check" />
                    {' '}
                    Disable file extension check
                  </label>
                </small>
              </div>
            </div>
            */}

            <div className="form-group react-h5-type">
              <label htmlFor="inputAction" className="control-label col-md-3">Method</label>
              <div className="col-md-6">
                <label className="radio-inline">
                  <input
                    type="radio"
                    name="action"
                    value="create"
                    className="laravel-h5p-type"
                    checked={submitAction === 'create'}
                    onChange={this.onSubmitActionRadioChange}
                  />
                  Create
                </label>
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-9 col-md-offset-3">
                <button type="submit" className="add-resource-submit-btn" onClick={this.submitResource}>
                  Finish
                </button>
              </div>
            </div>
          </fieldset>
        </form>

        {this.setH5PIntegrationVariable()}
      </>
    );
  }
}

H5PEditor.propTypes = {
  match: PropTypes.object.isRequired,
  resource: PropTypes.object.isRequired,
  h5pParams: PropTypes.string,
  h5pLib: PropTypes.string,
  handleEditResourceSubmit: PropTypes.func.isRequired,
};

H5PEditor.defaultProps = {
  h5pParams: '',
  h5pLib: '',
};

const mapStateToProps = (state) => ({
  resource: state.resource,
});

export default withRouter(connect(mapStateToProps)(H5PEditor));

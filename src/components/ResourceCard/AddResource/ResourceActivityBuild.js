/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FadeDiv } from 'utils';
import { showDescribeActivity } from 'store/actions/resource';
// import AddResourceSidebar from './AddResourceSidebar';
import TinyEditor from './Editors/TinyEditor';
import H5PEditor from './Editors/H5PEditor';

const ResourceActivityBuild = (props) => {
  const {
    resource,
    editResourcePopup,
    selectType,
    type,
    setActiveView,
  } = props;

  return (
    <div className="row">
      {/* <div className="col-md-3">
        <AddResourceSidebar {...props} />
      </div> */}

      <div className="col-md-12">
        <div className="resource-activity">
          <div
            className="back-button"
            style={{ marginLeft: '15px' }}
            onClick={() => {
              setActiveView('describe');
              type.splice(type.indexOf('build', 1));
              selectType(type);
            }}
          >
            <FontAwesomeIcon icon="chevron-left" className="mr-2" />
            Back
          </div>

          <FadeDiv>
            {resource.newResource.activity.type === 'h5p' && (
              <H5PEditor {...props} />
            )}

            {(resource.newResource.activity.type === 'tinymce' || resource.newResource.activity.type === 'immersive_reader') && (
              <TinyEditor {...props} />
            )}

            {editResourcePopup && (
              <H5PEditor
                {...props}
                h5pParams={JSON.stringify(resource.newResource.params)}
                // h5pParams = "{&quot;params&quot;:{&quot;interactiveVideo&quot;:{&quot;video&quot;:{&quot;startScreenOptions&quot;:{&quot;title&quot;:&quot;Interactive Video&quot;,&quot;hideStartTitle&quot;:false},&quot;textTracks&quot;:{&quot;videoTrack&quot;:[{&quot;label&quot;:&quot;Subtitles&quot;,&quot;kind&quot;:&quot;subtitles&quot;,&quot;srcLang&quot;:&quot;en&quot;}]},&quot;files&quot;:[{&quot;path&quot;:&quot;https:\/\/www.youtube.com\/watch?v=XI641BhgOnI&quot;,&quot;mime&quot;:&quot;video\/YouTube&quot;,&quot;copyright&quot;:{&quot;license&quot;:&quot;U&quot;}}]},&quot;assets&quot;:{},&quot;summary&quot;:{&quot;task&quot;:{&quot;library&quot;:&quot;H5P.Summary 1.10&quot;,&quot;params&quot;:{&quot;intro&quot;:&quot;Choose the correct statement.&quot;,&quot;summaries&quot;:[{&quot;subContentId&quot;:&quot;ff6e0e78-49a5-47b5-b50e-2c36efde0568&quot;,&quot;tip&quot;:&quot;&quot;}],&quot;overallFeedback&quot;:[{&quot;from&quot;:0,&quot;to&quot;:100}],&quot;solvedLabel&quot;:&quot;Progress:&quot;,&quot;scoreLabel&quot;:&quot;Wrong answers:&quot;,&quot;resultLabel&quot;:&quot;Your result&quot;,&quot;labelCorrect&quot;:&quot;Correct.&quot;,&quot;labelIncorrect&quot;:&quot;Incorrect! Please try again.&quot;,&quot;alternativeIncorrectLabel&quot;:&quot;Incorrect&quot;,&quot;labelCorrectAnswers&quot;:&quot;Correct answers.&quot;,&quot;tipButtonLabel&quot;:&quot;Show tip&quot;,&quot;scoreBarLabel&quot;:&quot;You got :num out of :total points&quot;,&quot;progressText&quot;:&quot;Progress :num of :total&quot;},&quot;subContentId&quot;:&quot;f8b52010-0902-4f3d-9396-8387036a36b6&quot;,&quot;metadata&quot;:{&quot;contentType&quot;:&quot;Summary&quot;,&quot;license&quot;:&quot;U&quot;,&quot;title&quot;:&quot;Untitled Summary&quot;}},&quot;displayAt&quot;:3}},&quot;override&quot;:{&quot;autoplay&quot;:false,&quot;loop&quot;:false,&quot;showBookmarksmenuOnLoad&quot;:false,&quot;showRewind10&quot;:false,&quot;preventSkipping&quot;:false,&quot;deactivateSound&quot;:false},&quot;l10n&quot;:{&quot;interaction&quot;:&quot;Interaction&quot;,&quot;play&quot;:&quot;Play&quot;,&quot;pause&quot;:&quot;Pause&quot;,&quot;mute&quot;:&quot;Mute&quot;,&quot;unmute&quot;:&quot;Unmute&quot;,&quot;quality&quot;:&quot;Video Quality&quot;,&quot;captions&quot;:&quot;Captions&quot;,&quot;close&quot;:&quot;Close&quot;,&quot;fullscreen&quot;:&quot;Fullscreen&quot;,&quot;exitFullscreen&quot;:&quot;Exit Fullscreen&quot;,&quot;summary&quot;:&quot;Open summary dialog&quot;,&quot;bookmarks&quot;:&quot;Bookmarks&quot;,&quot;endscreen&quot;:&quot;Submit screen&quot;,&quot;defaultAdaptivitySeekLabel&quot;:&quot;Continue&quot;,&quot;continueWithVideo&quot;:&quot;Continue with video&quot;,&quot;playbackRate&quot;:&quot;Playback Rate&quot;,&quot;rewind10&quot;:&quot;Rewind 10 Seconds&quot;,&quot;navDisabled&quot;:&quot;Navigation is disabled&quot;,&quot;sndDisabled&quot;:&quot;Sound is disabled&quot;,&quot;requiresCompletionWarning&quot;:&quot;You need to answer all the questions correctly before continuing.&quot;,&quot;back&quot;:&quot;Back&quot;,&quot;hours&quot;:&quot;Hours&quot;,&quot;minutes&quot;:&quot;Minutes&quot;,&quot;seconds&quot;:&quot;Seconds&quot;,&quot;currentTime&quot;:&quot;Current time:&quot;,&quot;totalTime&quot;:&quot;Total time:&quot;,&quot;singleInteractionAnnouncement&quot;:&quot;Interaction appeared:&quot;,&quot;multipleInteractionsAnnouncement&quot;:&quot;Multiple interactions appeared.&quot;,&quot;videoPausedAnnouncement&quot;:&quot;Video is paused&quot;,&quot;content&quot;:&quot;Content&quot;,&quot;answered&quot;:&quot;@answered answered&quot;,&quot;endcardTitle&quot;:&quot;@answered Question(s) answered&quot;,&quot;endcardInformation&quot;:&quot;You have answered @answered questions, click below to submit your answers.&quot;,&quot;endcardInformationNoAnswers&quot;:&quot;You have not answered any questions.&quot;,&quot;endcardInformationMustHaveAnswer&quot;:&quot;You have to answer at least one question before you can submit your answers.&quot;,&quot;endcardSubmitButton&quot;:&quot;Submit Answers&quot;,&quot;endcardSubmitMessage&quot;:&quot;Your answers have been submitted!&quot;,&quot;endcardTableRowAnswered&quot;:&quot;Answered questions&quot;,&quot;endcardTableRowScore&quot;:&quot;Score&quot;,&quot;endcardAnsweredScore&quot;:&quot;answered&quot;,&quot;endCardTableRowSummaryWithScore&quot;:&quot;You got @score out of @total points for the @question that appeared after @minutes minutes and @seconds seconds.&quot;,&quot;endCardTableRowSummaryWithoutScore&quot;:&quot;You have answered the @question that appeared after @minutes minutes and @seconds seconds.&quot;}},&quot;metadata&quot;:{&quot;title&quot;:&quot;ABC https:\/\/www.youtube.com\/watch?v=XI641BhgOnI&quot;,&quot;license&quot;:&quot;U&quot;}}"
                h5pLib="H5P.InteractiveVideo 1.21"
              />
            )}
          </FadeDiv>
        </div>
      </div>
    </div>
  );
};

ResourceActivityBuild.propTypes = {
  resource: PropTypes.object.isRequired,
  editResourcePopup: PropTypes.bool.isRequired,
  goBackToActivity: PropTypes.func.isRequired,
  handleCreateResourceSubmit: PropTypes.func.isRequired,
  handleEditResourceSubmit: PropTypes.func.isRequired,
  selectType: PropTypes.func.isRequired,
  type: PropTypes.array.isRequired,
  setActiveView: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  goBackToActivity: () => dispatch(showDescribeActivity()),
});

export default withRouter(
  connect(null, mapDispatchToProps)(ResourceActivityBuild),
);

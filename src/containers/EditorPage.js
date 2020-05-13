import React from 'react';

import axios from "axios";
import { connect } from "react-redux";

import { withRouter } from 'react-router-dom';




class EditorPage extends React.Component {


   constructor(props) {
      super(props);
      
      
      this.h5pLib = props.resource.newResource.activity.h5pLib; //"H5P.Audio 1.4";
      
      this.state = {
         submitAction : "create",
         h5pFile: null,
         // h5pLib:'H5P.InteractiveVideo 1.21',
         // h5pParams:"{&quot;params&quot;:{&quot;interactiveVideo&quot;:{&quot;video&quot;:{&quot;startScreenOptions&quot;:{&quot;title&quot;:&quot;Interactive Video&quot;,&quot;hideStartTitle&quot;:false},&quot;textTracks&quot;:{&quot;videoTrack&quot;:[{&quot;label&quot;:&quot;Subtitles&quot;,&quot;kind&quot;:&quot;subtitles&quot;,&quot;srcLang&quot;:&quot;en&quot;}]},&quot;files&quot;:[{&quot;path&quot;:&quot;https:\/\/www.youtube.com\/watch?v=XI641BhgOnI&quot;,&quot;mime&quot;:&quot;video\/YouTube&quot;,&quot;copyright&quot;:{&quot;license&quot;:&quot;U&quot;}}]},&quot;assets&quot;:{},&quot;summary&quot;:{&quot;task&quot;:{&quot;library&quot;:&quot;H5P.Summary 1.10&quot;,&quot;params&quot;:{&quot;intro&quot;:&quot;Choose the correct statement.&quot;,&quot;summaries&quot;:[{&quot;subContentId&quot;:&quot;ff6e0e78-49a5-47b5-b50e-2c36efde0568&quot;,&quot;tip&quot;:&quot;&quot;}],&quot;overallFeedback&quot;:[{&quot;from&quot;:0,&quot;to&quot;:100}],&quot;solvedLabel&quot;:&quot;Progress:&quot;,&quot;scoreLabel&quot;:&quot;Wrong answers:&quot;,&quot;resultLabel&quot;:&quot;Your result&quot;,&quot;labelCorrect&quot;:&quot;Correct.&quot;,&quot;labelIncorrect&quot;:&quot;Incorrect! Please try again.&quot;,&quot;alternativeIncorrectLabel&quot;:&quot;Incorrect&quot;,&quot;labelCorrectAnswers&quot;:&quot;Correct answers.&quot;,&quot;tipButtonLabel&quot;:&quot;Show tip&quot;,&quot;scoreBarLabel&quot;:&quot;You got :num out of :total points&quot;,&quot;progressText&quot;:&quot;Progress :num of :total&quot;},&quot;subContentId&quot;:&quot;f8b52010-0902-4f3d-9396-8387036a36b6&quot;,&quot;metadata&quot;:{&quot;contentType&quot;:&quot;Summary&quot;,&quot;license&quot;:&quot;U&quot;,&quot;title&quot;:&quot;Untitled Summary&quot;}},&quot;displayAt&quot;:3}},&quot;override&quot;:{&quot;autoplay&quot;:false,&quot;loop&quot;:false,&quot;showBookmarksmenuOnLoad&quot;:false,&quot;showRewind10&quot;:false,&quot;preventSkipping&quot;:false,&quot;deactivateSound&quot;:false},&quot;l10n&quot;:{&quot;interaction&quot;:&quot;Interaction&quot;,&quot;play&quot;:&quot;Play&quot;,&quot;pause&quot;:&quot;Pause&quot;,&quot;mute&quot;:&quot;Mute&quot;,&quot;unmute&quot;:&quot;Unmute&quot;,&quot;quality&quot;:&quot;Video Quality&quot;,&quot;captions&quot;:&quot;Captions&quot;,&quot;close&quot;:&quot;Close&quot;,&quot;fullscreen&quot;:&quot;Fullscreen&quot;,&quot;exitFullscreen&quot;:&quot;Exit Fullscreen&quot;,&quot;summary&quot;:&quot;Open summary dialog&quot;,&quot;bookmarks&quot;:&quot;Bookmarks&quot;,&quot;endscreen&quot;:&quot;Submit screen&quot;,&quot;defaultAdaptivitySeekLabel&quot;:&quot;Continue&quot;,&quot;continueWithVideo&quot;:&quot;Continue with video&quot;,&quot;playbackRate&quot;:&quot;Playback Rate&quot;,&quot;rewind10&quot;:&quot;Rewind 10 Seconds&quot;,&quot;navDisabled&quot;:&quot;Navigation is disabled&quot;,&quot;sndDisabled&quot;:&quot;Sound is disabled&quot;,&quot;requiresCompletionWarning&quot;:&quot;You need to answer all the questions correctly before continuing.&quot;,&quot;back&quot;:&quot;Back&quot;,&quot;hours&quot;:&quot;Hours&quot;,&quot;minutes&quot;:&quot;Minutes&quot;,&quot;seconds&quot;:&quot;Seconds&quot;,&quot;currentTime&quot;:&quot;Current time:&quot;,&quot;totalTime&quot;:&quot;Total time:&quot;,&quot;singleInteractionAnnouncement&quot;:&quot;Interaction appeared:&quot;,&quot;multipleInteractionsAnnouncement&quot;:&quot;Multiple interactions appeared.&quot;,&quot;videoPausedAnnouncement&quot;:&quot;Video is paused&quot;,&quot;content&quot;:&quot;Content&quot;,&quot;answered&quot;:&quot;@answered answered&quot;,&quot;endcardTitle&quot;:&quot;@answered Question(s) answered&quot;,&quot;endcardInformation&quot;:&quot;You have answered @answered questions, click below to submit your answers.&quot;,&quot;endcardInformationNoAnswers&quot;:&quot;You have not answered any questions.&quot;,&quot;endcardInformationMustHaveAnswer&quot;:&quot;You have to answer at least one question before you can submit your answers.&quot;,&quot;endcardSubmitButton&quot;:&quot;Submit Answers&quot;,&quot;endcardSubmitMessage&quot;:&quot;Your answers have been submitted!&quot;,&quot;endcardTableRowAnswered&quot;:&quot;Answered questions&quot;,&quot;endcardTableRowScore&quot;:&quot;Score&quot;,&quot;endcardAnsweredScore&quot;:&quot;answered&quot;,&quot;endCardTableRowSummaryWithScore&quot;:&quot;You got @score out of @total points for the @question that appeared after @minutes minutes and @seconds seconds.&quot;,&quot;endCardTableRowSummaryWithoutScore&quot;:&quot;You have answered the @question that appeared after @minutes minutes and @seconds seconds.&quot;}},&quot;metadata&quot;:{&quot;title&quot;:&quot;ABC https:\/\/www.youtube.com\/watch?v=XI641BhgOnI&quot;,&quot;license&quot;:&quot;U&quot;}}"
      };
      this.onSubmitActionRadioChange = this.onSubmitActionRadioChange.bind(this);
      this.setH5pFileUpload = this.setH5pFileUpload.bind(this);
      this.submitResource = this.submitResource.bind(this);
   }

   setH5pFileUpload(e){      
      this.setState({h5pFile: e.target.files[0]});
   }

   onSubmitActionRadioChange(e){
      this.setState({submitAction: e.currentTarget.value});
   }

   submitResource(event){
      event.preventDefault();           
      
      if(0){
         let payload = {event, submitAction: this.state.submitAction, h5pFile: this.state.h5pFile};
         this.props.handleEditResourceSubmit(this.props.match.params.playlistid, this.props.resource.newResource.activity.h5pLib, this.props.resource.newResource.activity.h5pLibType, payload);
      } else if(this.state.submitAction === "upload" && this.state.h5pFile === null){
         alert("Please choose .h5p file");
      } else if(this.state.submitAction === "upload" && this.state.h5pFile !== null){        
         let file_arr = this.state.h5pFile.name.split('.');
         let file_extension = file_arr.length > 0 ? file_arr[file_arr.length-1] : "";
         if (file_extension !== "h5p") {
            alert("Invalid File\""+this.state.h5pFile.name+"\". Please choose .h5p file");           
         }else{
            let payload = {event, submitAction: this.state.submitAction, h5pFile: this.state.h5pFile};
            this.props.handleCreateResourceSubmit(this.props.match.params.playlistid, this.props.resource.newResource.activity.h5pLib, this.props.resource.newResource.activity.h5pLibType, payload, this.props.resource.newResource.metaData );
         }
      } else if(this.state.submitAction === "create") {
         let payload = {event, submitAction: this.state.submitAction, h5pFile: this.state.h5pFile};
         if(this.props.match.params.playlistid){
            this.props.handleCreateResourceSubmit(this.props.match.params.playlistid, this.props.resource.newResource.activity.h5pLib, this.props.resource.newResource.activity.h5pLibType, payload, this.props.resource.newResource.metaData);
         }
         else {
            alert("Error: Playlistid not present");
            console.log('===========');
            console.log(this.props);
            console.log('===========');
         }
         
      }
   }

   componentDidMount() {
      
      
      const { token } = JSON.parse(localStorage.getItem("auth"));
      
      
      
      
      
      this.setH5PIntegrationVariable();
      
      

   }

   setH5PIntegrationVariable (){
      const { token } = JSON.parse(localStorage.getItem("auth"));
      axios.get(global.config.h5pAjaxUrl+'/api/h5p/create', {
         headers: {
            "Authorization": "Bearer "+token
         }
      })
      .then((response) => {
         window.H5PIntegration = response.data.settings;
         

         response.data.settings.editor.assets.js.forEach((value) => {
            var script = document.createElement("script");
            script.src = value;
            script.async = false;
            document.body.appendChild(script);
         });
      });
   }

   

   handleH5PSubmit() {
     const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'JWT fefege...'
    }
    const data = {
      library: window.h5peditorCopy.getLibrary(),
      parameters: JSON.stringify(window.h5peditorCopy.getParams()),
      action: 'create'
    }
    axios.post(global.config.h5pAjaxUrl+'/h5p/?api_token=test', data, {
        headers: headers
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });

      return false;
   }
   render() {

      return (
         <>
            <form method="POST" action={global.config.h5pAjaxUrl+"/h5p"} accept-charset="UTF-8" className="form-horizontal"  /*enctype="multipart/form-data"*/ id="laravel-h5p-form">
               
               { this.props.editResourcePopup ? 
                  <>
                     <input name="_token" type="hidden" value="B6TFsmFD5TLZaWCAYZ91ly0D2We0xjLAtRmBJzQT" />
                     <input type="hidden" name="library" id="laravel-h5p-library" value={this.props.h5pLib} />
                     <input type="hidden" name="parameters" id="laravel-h5p-parameters" value={this.props.h5pParams} />
                  </>
                  :
                  <>
                     <input type="hidden" name="library" id="laravel-h5p-library" value={this.h5pLib} />
                     <input type="hidden" name="parameters" id="laravel-h5p-parameters" value="{&quot;params&quot;:{},&quot;metadata&quot;:{}}" />
                  </>
               }

               
               

               

               <fieldset>

                  <div id="laravel-h5p-create" className="form-group ">
                     <label for="inputParameters" className="control-label col-md-3">&nbsp;</label>
                     <div className="col-md-9">
                        <div>
                           <div id="laravel-h5p-editor">Loading...</div>
                        </div>


                     </div>
                  </div>



                  <div className="form-group laravel-h5p-upload-container">
                     <label for="inputUpload" className="control-label col-md-3">Upload</label>
                     <div className="col-md-9">
                        <input type="file" name="h5p_file" id="h5p-file" className="laravel-h5p-upload form-control" onChange={(e) => this.setH5pFileUpload(e)} />
                        <small className="h5p-disable-file-check helper-block">
                           <label className="">
                              <input type="checkbox" name="h5p_disable_file_check" id="h5p-disable-file-check" /> Disable file extension check
                            </label>
                        </small>

                     </div>
                  </div>

                  <div className="form-group ">
                     <label for="inputAction" className="control-label col-md-3">Method</label>
                     <div className="col-md-6">

                        <label className="radio-inline">
                           <input type="radio" name="action" value="upload" className="laravel-h5p-type" checked={this.state.submitAction === 'upload'} onChange={this.onSubmitActionRadioChange} />Upload
                        </label>
                        <label className="radio-inline">
                           <input type="radio" name="action" value="create" className="laravel-h5p-type" checked={this.state.submitAction === 'create'} onChange={this.onSubmitActionRadioChange} />Create
                        </label>


                     </div>
                  </div>


                  <div className="form-group">
                     <div className="col-md-9 col-md-offset-3">
                        <button type="submit" className="add-resource-submit-btn" onClick={this.submitResource}>Finish</button>
                     </div>

                  </div>


               </fieldset>

            </form>
         </>
      );
   }

}




const mapDispatchToProps = dispatch => ({
   
});

const mapStateToProps = (state) => {
   return {
      resource: state.resource
   };
}




export default withRouter(connect(mapStateToProps,
   mapDispatchToProps)(EditorPage))
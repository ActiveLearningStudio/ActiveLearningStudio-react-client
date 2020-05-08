import React from 'react';

import axios from "axios";
import { connect } from "react-redux";

import { withRouter } from 'react-router-dom';




class EditorPage extends React.Component {


   constructor(props) {
      super(props);
      
      
      this.h5pLib = props.resource.newResource.editor; //"H5P.Audio 1.4";
      this.state = {submitAction : "create", h5pFile: null};
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
      if(this.state.submitAction === "upload" && this.state.h5pFile === null){
         alert("Please choose .h5p file");
      }else if(this.state.submitAction === "upload" && this.state.h5pFile !== null){        
         let file_arr = this.state.h5pFile.name.split('.');
         let file_extension = file_arr.length > 0 ? file_arr[file_arr.length-1] : "";
         if (file_extension !== "h5p") {
            alert("Invalid File\""+this.state.h5pFile.name+"\". Please choose .h5p file");           
         }else{
            let payload = {event, submitAction: this.state.submitAction, h5pFile: this.state.h5pFile};
            this.props.handleCreateResourceSubmit(this.props.resource.currentPlaylistId, this.props.resource.newResource.editor, this.props.resource.newResource.editorType, payload);
         }
      }else if(this.state.submitAction === "create") {
         let payload = {event, submitAction: this.state.submitAction, h5pFile: this.state.h5pFile};
         if(this.props.resource.currentPlaylistId){
            this.props.handleCreateResourceSubmit(this.props.resource.currentPlaylistId, this.props.resource.newResource.editor, this.props.resource.newResource.editorType, payload);
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
      
      
      
      
      axios.get(global.config.h5pAjaxUrl+'/api/h5p/create', {
         headers: {
            "Authorization": "Bearer "+token
         }
      })
      .then((response) => {
         console.log("========================");
         window.H5PIntegration = response.data.settings;
         console.log(window.H5PIntegration);
         console.log("========================");

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
         <div>
            <form method="POST" action={global.config.h5pAjaxUrl+"/h5p"} accept-charset="UTF-8" className="form-horizontal"  /*enctype="multipart/form-data"*/ id="laravel-h5p-form">
               <input name="_token" type="hidden" value="B6TFsmFD5TLZaWCAYZ91ly0D2We0xjLAtRmBJzQT" />
               <input type="hidden" name="library" id="laravel-h5p-library" value={this.h5pLib} />
               <input type="hidden" name="parameters" id="laravel-h5p-parameters" value="{&quot;params&quot;:{},&quot;metadata&quot;:{}}" />

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




                  {/* <div className="form-group h5p-sidebar">
                    <label className="control-label col-md-3">Display Options</label>
                    <div className="col-md-9">

                        <div className="form-control-static">

                            <ul className="list-unstyled">

                                <li>
                                    <label>
                                        <input className="h5p-visibility-toggler" data-h5p-visibility-subject-selector=".h5p-action-bar-buttons-settings" id="laravel-h5p-title" value="1" checked="checked" name="frame" type="checkbox" />
                                        Toolbar Below Content
                                    </label>
                                </li>

                                                                <li>
                                    <label>
                                        <input className="h5p-visibility-toggler" data-h5p-visibility-subject-selector=".h5p-action-bar-buttons-settings" id="laravel-h5p-title" value="1" checked="checked" name="download" type="checkbox" />
                                        Display Download button
                                    </label>
                                </li>
                                
                                                                <li>
                                    <label>
                                        <input className="h5p-visibility-toggler" data-h5p-visibility-subject-selector=".h5p-action-bar-buttons-settings" id="laravel-h5p-title" value="1" checked="checked" name="embed" type="checkbox" />
                                        Display Embed button
                                    </label>
                                </li>
                                
                                                                <li>
                                    <label>
                                        <input className="h5p-visibility-toggler" data-h5p-visibility-subject-selector=".h5p-action-bar-buttons-settings" id="laravel-h5p-title" value="1" checked="checked" name="copyright" type="checkbox" />
                                        Display Copyright button
                                    </label>
                                </li>
                                
                            </ul>
                        </div>

                    </div>

                </div> */}


                  <div className="form-group">
                     <div className="col-md-9 col-md-offset-3">
                        <button type="submit" className="add-resource-submit-btn" onClick={this.submitResource}>Finish</button>
                        {/* <input className="btn btn-primary" data-loading-text="Saving..." type="submit" value="Save" /> */}

                     </div>

                  </div>


               </fieldset>

            </form>
         </div>
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
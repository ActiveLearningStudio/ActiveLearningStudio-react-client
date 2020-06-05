import React from 'react';

import axios from "axios";
import { connect } from "react-redux";

import { withRouter } from 'react-router-dom';

import { createResourceAction } from "./../actions/resource";


class H5PPreview extends React.Component {


   constructor(props) {
      super(props);
      this.h5pLib = props.resource.editor; //"H5P.Audio 1.4";
   }
   componentDidMount() {
      var previewResourceId = this.props.resourceid;


      const headers = {
         'Content-Type': 'application/json',
         'Authorization': 'JWT fefege...'
      }


      axios.get(global.config.laravelAPIUrl + '/h5p-resource-settings/' + previewResourceId, {
         headers: headers
      })
         .then(async (response) => {
            console.log(response);
            
            window.H5PIntegration = response.data.data.h5p.settings;

            var h5pWrapper = document.getElementById('curriki-h5p-wrapper');
            h5pWrapper.innerHTML = response.data.data.h5p.embed_code.trim();
            
            await Promise.all(response.data.data.h5p.settings.loadedCss.map((value) => {
               var link = document.createElement("link");
               link.href = value;
               link.type = "text/css";
               link.rel = "stylesheet";
               document.head.appendChild(link);
            }));


            var new_scripts = response.data.data.h5p.settings.core.scripts.concat(response.data.data.h5p.settings.loadedJs);
            new_scripts.map((value) => {
                  var script = document.createElement("script");
                  script.src = value;
                  script.async = false;
                  document.body.appendChild(script);
            });
            
         })
         .catch((error) => {
            console.log(error);
         });

   }


   render() {
      // alert();
      return (
         <div>
            <div className="container">
               <div className="col-md-12" id="curriki-h5p-wrapper">
               </div>
            </div>

         </div>
      );
   }

}




const mapDispatchToProps = dispatch => ({
   createResourceAction: (playlistid, editor, editorType) => dispatch(createResourceAction(playlistid, editor, editorType)),
});

const mapStateToProps = (state) => {
   return {
      resource: state.resource
   };
}




export default withRouter(connect(mapStateToProps,
   mapDispatchToProps)(H5PPreview))
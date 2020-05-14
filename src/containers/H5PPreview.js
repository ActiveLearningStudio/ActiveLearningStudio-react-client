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


      axios.get(global.config.laravelAPIUrl + '/loadh5presource/' + previewResourceId, {
         headers: headers
      })
         .then((response) => {
            console.log(response);
            
            window.H5PIntegration = response.data.data.h5p.settings;

            var iframe = document.createElement('iframe');
            iframe.setAttribute("id", "h5p-iframe-" + response.data.data.activity.mysqlid);
            iframe.setAttribute("class", "h5p-iframe");
            iframe.setAttribute("data-content-id", response.data.data.activity.mysqlid);
            iframe.setAttribute("src", "about:blank");
            iframe.setAttribute("frameBorder", "0");
            iframe.setAttribute("scrolling", "no");
            document.getElementsByClassName("h5p-iframe-wrapper")[0].appendChild(iframe);

            response.data.data.h5p.settings.editor.assets.js.forEach((value) => {

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
      return (
         <div>
            <div className="container">
               <div className="col-md-12">
                  <div className="h5p-content-wrap">
                     <div className="h5p-iframe-wrapper">
                     </div>
                  </div>
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
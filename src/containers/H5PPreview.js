import React from 'react';

import axios from "axios";
import { connect } from "react-redux";

import { withRouter } from 'react-router-dom';

import { createResourceAction } from "./../actions/resource";


class EditorPage extends React.Component {


   constructor(props) {
      super(props);

      
      this.h5pLib = props.resource.editor; //"H5P.Audio 1.4";



   }
   componentDidMount() {
      // console.log(this.state);
      // this.h5pLib = "H5P.MultiChoice 1.14";


      let scripts = [
         
      ]
      //Append the script element on each iteration
      // scripts.map(item => { 
      //     const script = document.createElement("script")
      //     script.src = item.src
      //     script.async = true
      //     // script.onload = () => ;
      //     document.body.appendChild(script)
      // }) ;

      // scripts.map(item => { 
      

      //   var script = document.createElement("script");
      //   script.src = "/h5p/laravel-h5p/js/laravel-h5p.js";
      //   script.async = false;
      //   document.body.appendChild(script);


      var previewResourceId = this.props.resource.previewResourceId;
      

      const headers = {
         'Content-Type': 'application/json',
         'Authorization': 'JWT fefege...'
       }
      axios.get('http://localhost:8082/api/api/h5p/'+previewResourceId, {
        headers: headers
      })
      .then((response) => {
         console.log("========================");
         window.H5PIntegration = response.data.settings;

         var iframe = document.createElement('iframe');
         iframe.setAttribute("id", "h5p-iframe-"+previewResourceId);
         iframe.setAttribute("class", "h5p-iframe");
         iframe.setAttribute("data-content-id", previewResourceId);
         iframe.setAttribute("src", "about:blank");
         iframe.setAttribute("frameBorder", "0");
         iframe.setAttribute("scrolling", "no");
         document.getElementsByClassName("h5p-iframe-wrapper")[0].appendChild(iframe);


         var script = document.createElement("script");
         script.src = "/h5p/h5p-core/js/jquery.js";
         script.async = false;
         document.body.appendChild(script);

         var script = document.createElement("script");
         script.src = "/h5p/h5p-core/js/h5p.js";
         script.async = false;
         document.body.appendChild(script);

         var script = document.createElement("script");
         script.src = "/h5p/h5p-core/js/h5p-event-dispatcher.js";
         script.async = false;
         document.body.appendChild(script);

         var script = document.createElement("script");
         script.src = "/h5p/h5p-core/js/h5p-x-api-event.js";
         script.async = false;
         document.body.appendChild(script);

         var script = document.createElement("script");
         script.src = "/h5p/h5p-core/js/h5p-x-api.js";
         script.async = false;
         document.body.appendChild(script);

         var script = document.createElement("script");
         script.src = "/h5p/h5p-core/js/h5p-content-type.js";
         script.async = false;
         document.body.appendChild(script);

         var script = document.createElement("script");
         script.src = "/h5p/h5p-core/js/h5p-confirmation-dialog.js";
         script.async = false;
         document.body.appendChild(script);

         var script = document.createElement("script");
         script.src = "/h5p/h5p-core/js/h5p-action-bar.js";
         script.async = false;
         document.body.appendChild(script);

         var script = document.createElement("script");
         script.src = "/h5p/h5p-core/js/request-queue.js";
         script.async = false;
         document.body.appendChild(script);

         var script = document.createElement("script");
         script.src = "/h5p/h5p-editor/scripts/h5peditor-editor.js";
         script.async = false;
         document.body.appendChild(script);

         
         // var html = '<body>Foo</body>';
         // iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
         
         
         // console.log('iframe.contentWindow =', iframe.contentWindow);

      // window.setTimeout(()=>{
      //    alert(iframe);
         
      //    // this.scriptLoaded();
      //    }, 3000);
         
         
         
         console.log(window.H5PIntegration);
        console.log(response);
        console.log("========================");
      })
      .catch((error) => {
        console.log(error);
      });



      // }) ;
      

   }

   scriptLoaded() {
      // console.log(window.H5P);

      var ns = window.H5PEditor;

      (function ($) {
         window.H5PEditor.init = function () {


            window.H5PEditor.$ = window.H5P.jQuery;
            window.H5PEditor.basePath = window.H5PIntegration.editor.libraryUrl;
            window.H5PEditor.fileIcon = window.H5PIntegration.editor.fileIcon;
            window.H5PEditor.ajaxPath = window.H5PIntegration.editor.ajaxPath;
            window.H5PEditor.filesPath = window.H5PIntegration.editor.filesPath;
            window.H5PEditor.apiVersion = window.H5PIntegration.editor.apiVersion;
            window.H5PEditor.contentLanguage = window.H5PIntegration.editor.language;

            // Semantics describing what copyright information can be stored for media.
            window.H5PEditor.copyrightSemantics = window.H5PIntegration.editor.copyrightSemantics;
            window.H5PEditor.metadataSemantics = window.H5PIntegration.editor.metadataSemantics;

            // Required styles and scripts for the editor
            window.H5PEditor.assets = window.H5PIntegration.editor.assets;

            // Required for assets
            window.H5PEditor.baseUrl = '';

            if (window.H5PIntegration.editor.nodeVersionId !== undefined) {
               window.H5PEditor.contentId = window.H5PIntegration.editor.nodeVersionId;
            }

            var h5peditor;
            var $upload = $('.laravel-h5p-upload').parents('.laravel-h5p-upload-container');
            var $editor = $('#laravel-h5p-editor');
            var $create = $('#laravel-h5p-create').hide();
            var $type = $('.laravel-h5p-type');
            var $params = $('#laravel-h5p-parameters');
            var $library = $('#laravel-h5p-library');
            var library = $library.val();

            $type.change(function () {
               if ($type.filter(':checked').val() === 'upload') {
                  $create.hide();
                  $upload.show();
               }
               else {
                  $upload.hide();
                  if (h5peditor === undefined) {
                     window.h5peditorCopy = h5peditor = new ns.Editor(library, $params.val(), $editor[0]);
                  }
                  $create.show();
               }
            });

            if ($type.filter(':checked').val() === 'upload') {
               $type.change();
            }
            else {
               $type.filter('input[value="create"]').attr('checked', true).change();
            }

            let formIsUpdated = false;
            const $form = $('#laravel-h5p-form').submit(function (event) {
               if ($type.length && $type.filter(':checked').val() === 'upload') {
                  return; // Old file upload
               }

               if (h5peditor !== undefined && !formIsUpdated) {
                  event.preventDefault();
               }
            });

            // Title label
            var $title = $('#laravel-h5p-title');
            var $label = $title.prev();
            $title.focus(function () {
               $label.addClass('screen-reader-text');
            }).blur(function () {
               if ($title.val() === '') {
                  $label.removeClass('screen-reader-text');
               }
            }).focus();

            // Delete confirm
            $('#laravel-h5p-destory').click(function () {
               return window.confirm(window.H5PIntegration.editor.deleteMessage);
            });

         };

         window.H5PEditor.getAjaxUrl = function (action, parameters) {

            var url = window.H5PIntegration.editor.ajaxPath + action + '/?';

            if (parameters !== undefined) {
               for (var property in parameters) {
                  if (parameters.hasOwnProperty(property)) {
                     url += '&' + property + '=' + parameters[property];
                  }
               }
            }

            return url;
         };

         $(document).ready(window.H5PEditor.init);
         //   window.H5P.jQuery("iframe").contents().find(".h5peditor>select").css({"display":"none"});
      })(window.H5P.jQuery);
   }

   handleH5PSubmit() {
      console.log(window.h5peditorCopy);


      


     const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'JWT fefege...'
    }
    const data = {
      library: window.h5peditorCopy.getLibrary(),
      parameters: JSON.stringify(window.h5peditorCopy.getParams()),
      action: 'create'
    }
    axios.post('http://localhost:8082/api/api/h5p/?api_token=test', data, {
        headers: headers
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
      // $.ajax({
      //    url: "http://localhost:8082/api/api/h5p/?api_token=test",
      //    data: JSON.stringify({
      //       library: h5peditor.getLibrary(),
      //       parameters: JSON.stringify(h5peditor.getParams()),
      //       action: 'create'
      //    }),
      //    headers: {
      //       'Content-Type': 'application/json'
      //    },
      //    type: 'POST'
      // }).then((result) => {
      //    console.log(result);
      //    return false;
      //    // const parsedResult = JSON.parse(result)
      //    // if(parsedResult.contentId) {
      //    //     window.location.href = 'http://localhost:8080/h5p/play/' + parsedResult.contentId;
      //    // }
      // });

      return false;
      alert();
      return false;
   }
   render() {
      return (
         <div>
            <div className="h5p-content-wrap">
                <div className="h5p-iframe-wrapper">
                   {/* <iframe id="h5p-iframe-5ea5809137152b00d0750442" className="h5p-iframe" data-content-id="5ea5809137152b00d0750442" src="about:blank" frameBorder="0" scrolling="no"></iframe> */}
                   </div>
            </div>
         </div>
      );
   }

}




const mapDispatchToProps = dispatch => ({
   createResourceAction: (playlistId, editor, editorType) => dispatch(createResourceAction(playlistId, editor, editorType)),
});

const mapStateToProps = (state) => {
   return {
      resource: state.resource
   };
}




export default withRouter(connect(mapStateToProps,
   mapDispatchToProps)(EditorPage))
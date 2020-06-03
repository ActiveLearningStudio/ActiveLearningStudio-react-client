import React from 'react';

import axios from "axios";
import {
    connect
} from "react-redux";

import {
    withRouter
} from 'react-router-dom';

import {
    createResourceAction
} from "./../actions/resource";


class H5PPreview extends React.Component {
    constructor(props) {
        super(props);
        this.h5pLib = props.resource.editor; //"H5P.Audio 1.4";
    }

    componentDidMount() {
        this.loadResorce(this.props.resourceid);
    }

    loadResorce(resourceid) {
        if (resourceid == 0)
            return;
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'JWT fefege...'
        }


        axios.get(global.config.laravelAPIUrl + '/h5p-resource-settings/' + resourceid, {
                headers: headers
            })
            .then((response) => {
                this.resourceLoaded(response)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    resourceLoaded(response) {
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
    }

    componentWillReceiveProps(props) {
      if (this.props.resourceid != props.resourceid) {
        var h5pIFrame = document.getElementsByClassName('h5p-iframe');
        if(h5pIFrame.length)
          h5pIFrame[0].remove();
        this.loadResorce(props.resourceid);
      }
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
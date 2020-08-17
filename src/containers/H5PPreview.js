import React from "react";
import gifloader from "../images/276.gif";
import axios from "axios";
import { connect } from "react-redux";
import Unauthorized from "../components/unauthorized";
import { withRouter } from "react-router-dom";

import { createResourceAction } from "./../actions/resource";

class H5PPreview extends React.Component {
  constructor(props) {
    super(props);
    this.h5pLib = props.resource.editor; //"H5P.Audio 1.4";

    this.state = {
      shared: true,
    };
  }

  componentDidMount() {
    if (this.props.showltipreview) {
      this.loadResorceLti(this.props.resourceid);
    } else if (this.props.ltiactivity) {
      this.loadResorceltiActivity(this.props.resourceid);
    } else if (this.props.showActivitypreview) {
      this.loadResorceActivity(this.props.resourceid);
    } else {
      this.loadResorce(this.props.resourceid);
    }
  }

  loadResorce(resourceid) {
    if (resourceid == 0) return;
    const { token } = JSON.parse(localStorage.getItem("auth"));

    axios
      .post(
        global.config.laravelAPIUrl + "/h5p-resource-settings",
        { resourceid },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        this.resourceLoaded(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadResorceLti(resourceid) {
    if (resourceid == 0) return;

    axios
      .post(global.config.laravelAPIUrl + "/h5p-resource-settings-open", {
        resourceid,
      })
      .then((response) => {
        this.resourceLoaded(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadResorceActivity(resourceid) {
    if (resourceid == 0) return;

    axios
      .post(global.config.laravelAPIUrl + "/h5p-resource-settings-shared", {
        resourceid,
      })
      .then((response) => {
        this.resourceLoaded(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadResorceltiActivity(resourceid) {
    if (resourceid == 0) return;

    axios
      .post(global.config.laravelAPIUrl + "/h5p-resource-settings-public", {
        resourceid,
      })
      .then((response) => {
        this.resourceLoaded(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async resourceLoaded(response) {
    console.log(response);
    if (response.data.status == "fail") {
      this.setState({
        shared: false,
      });
      return;
    }

    window.H5PIntegration = response.data.data.h5p.settings;

    var h5pWrapper = document.getElementById("curriki-h5p-wrapper");
    h5pWrapper.innerHTML = response.data.data.h5p.embed_code.trim();

    await Promise.all(
      response.data.data.h5p.settings.loadedCss.map((value) => {
        var link = document.createElement("link");
        link.href = value;
        link.type = "text/css";
        link.rel = "stylesheet";
        document.head.appendChild(link);
      })
    );

    var new_scripts = response.data.data.h5p.settings.core.scripts.concat(
      response.data.data.h5p.settings.loadedJs
    );
    new_scripts.map((value) => {
      var script = document.createElement("script");
      script.src = value;
      script.async = false;
      document.body.appendChild(script);
    });
  }

  componentWillReceiveProps(props) {
    if (this.props.resourceid != props.resourceid) {
      var h5pIFrame = document.getElementsByClassName("h5p-iframe");
      if (h5pIFrame.length) h5pIFrame[0].remove();
      if (this.props.showltipreview) {
        this.loadResorceLti(props.resourceid);
      } else if (this.props.showActivitypreview) {
        this.loadResorceActivity(props.resourceid);
      } else {
        this.loadResorce(props.resourceid);
      }
    }
  }

  render() {
    return (
      <>
        {!this.state.shared ? (
          <div id="curriki-h5p-wrapper">
            <div className="loader_gif" style={{ color: "black" }}>
              Activity Resource is not sharable
            </div>
          </div>
        ) : (
          <div id="curriki-h5p-wrapper">
            <div className="loader_gif">
              <img src={gifloader} />
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createResourceAction: (playlistid, editor, editorType) =>
    dispatch(createResourceAction(playlistid, editor, editorType)),
});

const mapStateToProps = (state) => {
  return {
    resource: state.resource,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(H5PPreview)
);

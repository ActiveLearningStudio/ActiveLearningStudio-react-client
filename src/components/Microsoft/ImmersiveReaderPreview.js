import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { launchAsync } from "@microsoft/immersive-reader-sdk";
import "./ImmersiveReaderPreview.scss";

export class ImmersiveReaderPreview extends React.Component {
  constructor(props) {
    super(props);
  }

  doLaunch = () => {
    const { token } = JSON.parse(localStorage.getItem("auth"));
    axios
      .get(global.config.laravelAPIUrl + "/immersive", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        var token = response.data.access_token;
        var subdomain = "curriki";
        const data = {
          title: this.props.activity.metadata.title,
          chunks: [
            {
              content: this.props.activity.textcontent,
              mimeType: "text/html",
            },
          ],
        };

        launchAsync(token, subdomain, data);
      });
  };

  render() {
    return (
      <div className="immersiveReaderViewer">
        <h1>{this.props.activity.metadata.title}</h1>
        <button onClick={() => this.doLaunch()}>Launch Immersive Reader</button>
        <div
          dangerouslySetInnerHTML={{ __html: this.props.activity.textcontent }}
        ></div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ImmersiveReaderPreview)
);

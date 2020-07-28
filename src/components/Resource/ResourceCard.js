import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import youtube from "./assets/images/social-media.svg";
import imageplaceholder from "./assets/images/interface.svg";
import list from "./assets/images/signs.svg";
import logo from "../../images/logo.svg";
import Swal from "sweetalert2";
import { showDeletePopupAction, hideDeletePopupAction } from "../../actions/ui";
import "./ResourceCard.scss";
import ComingSoon from "../comingSoon/model";
import { Event } from "../../trackers/ga";
import Sharelink from "./sharelinks";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export class ResourceCard extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  handleDelete = (e) => {
    e.preventDefault();
    this.props.showDeletePopupAction(
      this.props.resource._id,
      this.props.resource.title,
      "Activity"
    );
  };

  render() {
    return (
      <Draggable
        key={this.props.resource._id}
        draggableId={this.props.resource._id}
        index={this.props.index}
      >
        {(provided) => (
          <div
            className="playlist-resource"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="resource-card-wrapper">
              {this.props.resource.metadata &&
              this.props.resource.metadata.thumb_url ? (
                <div className="activity-thumb-wrapper">
                  <Link
                    to={
                      "/playlist/preview/" +
                      this.props.playlist._id +
                      "/resource/" +
                      this.props.resource._id
                    }
                  >
                    <div
                      className="activity-thumb"
                      style={{
                        backgroundImage:
                          "url(" +
                          global.config.laravelAPIUrl +
                          this.props.resource.metadata.thumb_url +
                          ")",
                      }}
                    ></div>
                  </Link>
                </div>
              ) : null}

              <div
                className={
                  this.props.resource.metadata &&
                  this.props.resource.metadata.thumb_url
                    ? "activity-thumb-content"
                    : "activity-thumb-content"
                }
              >
                <div className="title">
                  <Link
                    to={
                      "/playlist/preview/" +
                      this.props.playlist._id +
                      "/resource/" +
                      this.props.resource._id
                    }
                  >
                    {this.props.resource.metadata &&
                    this.props.resource.metadata.title != undefined
                      ? this.props.resource.metadata.title
                      : this.props.resource.title}
                  </Link>
                </div>
                {/* <div className="social-icons-tray">
                  <Link to="">
                    <img src={imageplaceholder} alt="" />
                  </Link>
                  <Link to="">
                    <img src={youtube} alt="" />
                  </Link>
                  <Link to="">
                    <img src={list} alt="" />
                  </Link>
                </div> */}
              </div>
              <div className="activity-options-wrapper check">
                <div className="activity-options">
                  <div className="dropdown pull-right">
                    <button
                      className="btn project-dropdown-btn"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <Link
                        className="dropdown-item"
                        to={
                          "/playlist/preview/" +
                          this.props.playlist._id +
                          "/resource/" +
                          this.props.resource._id
                        }
                      >
                        <i className="fa fa-eye" aria-hidden="true"></i> Preview
                      </Link>
                      <Link
                        className="dropdown-item"
                        to={
                          "/project/" +
                          this.props.match.params.projectid +
                          "/playlist/" +
                          this.props.playlist._id +
                          "/activity/create/" +
                          this.props.resource._id
                        }
                      >
                        <i className="fa fa-pencil" aria-hidden="true"></i> Edit
                      </Link>
                      <a
                        className="dropdown-item"
                        onClick={() => {
                          let protocol =
                            window.location.href.split("/")[0] + "//";
                          confirmAlert({
                            customUI: ({ onClose }) => {
                              return (
                                <div className="share-project-preview-url project-share-check">
                                  <br />
                                  <h3>
                                    You can now share Activity{" "}
                                    <strong>{this.props.resource.title}</strong>
                                    <br />
                                    Anyone with the link below can access your
                                    activity:
                                  </h3>

                                  <a
                                    target="_blank"
                                    href={
                                      "/shared/activity/" +
                                      this.props.resource._id.trim()
                                    }
                                  >
                                    <input
                                      id="urllink_clip"
                                      value={
                                        protocol +
                                        window.location.host +
                                        "/shared/activity/" +
                                        this.props.resource._id
                                      }
                                    />
                                  </a>

                                  <i
                                    title="copy to clipboard"
                                    className="fa fa-clipboard"
                                    aria-hidden="true"
                                    onClick={() => {
                                      /* Get the text field */
                                      var copyText = document.getElementById(
                                        "urllink_clip"
                                      );
                                      alert;
                                      /* Select the text field */
                                      copyText.focus();
                                      copyText.select();
                                      //  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

                                      /* Copy the text inside the text field */
                                      document.execCommand("copy");

                                      /* Alert the copied text */
                                      Swal.fire({
                                        title: "Link Copied",
                                        showCancelButton: false,
                                        showConfirmButton: false,
                                        timer: 1500,
                                        allowOutsideClick: false,
                                      });
                                    }}
                                  ></i>
                                  <br />

                                  <div className="close-btn">
                                    <button onClick={onClose}>Ok</button>
                                  </div>
                                </div>
                              );
                            },
                          });
                        }}
                      >
                        <i className="fa fa-share" aria-hidden="true"></i> Share
                      </a>

                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          Swal.fire({
                            title: "STAY TUNED!",
                            text: "COMING SOON",
                            imageUrl: logo,
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: "Custom image",
                          });
                        }}
                      >
                        <i
                          className="fa fa-cloud-download"
                          aria-hidden="true"
                        ></i>{" "}
                        Executable
                      </a>
                      <a className="dropdown-item" onClick={this.handleDelete}>
                        <i
                          className="fa fa-times-circle-o"
                          aria-hidden="true"
                        ></i>{" "}
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
            </div>
            {/*	<div className="row timestamp">
							<div className="col-md-12">
								<p>
									{new Date(this.props.resource.created_at).toDateString()}
								</p>
							</div>
						</div> */}
          </div>
        )}
      </Draggable>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  showDeletePopupAction: (id, title, deleteType) =>
    dispatch(showDeletePopupAction(id, title, deleteType)),
  hideDeletePopupAction: () => dispatch(hideDeletePopupAction()),
});

const mapStateToProps = (state) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResourceCard)
);

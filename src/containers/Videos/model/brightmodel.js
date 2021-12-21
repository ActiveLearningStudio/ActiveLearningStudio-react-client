/*eslint-disable*/
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import "./style.scss";
import HeadingTwo from "utils/HeadingTwo/headingtwo";
import { Accordion, Card, Alert, Tab, Row, Col, Nav } from "react-bootstrap";
import PreivewImage from "assets/images/cardlistimg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCog } from "@fortawesome/free-solid-svg-icons";
import HeadingThree from "utils/HeadingThree/headingthree";
import Buttons from "utils/Buttons/buttons";
import { useDispatch, useSelector } from "react-redux";
import { getBrightCMS, getBrightVideos } from "store/actions/videos";
const BrightcoveModel = (props) => {
  const dispatch = useDispatch();
  const [cms, setcms] = useState([]);
  const [cmsVideo, setcmsVideo] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await dispatch(getBrightCMS());
      const videosResult = await dispatch(
        getBrightVideos(result.data?.[0]?.id)
      );
      console.log("videosResult:", videosResult);
      setcms(result.data);
      setcmsVideo(videosResult.data);
    })();
  }, []);
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="preview-layout-model"
    >
      <Modal.Header
        style={{ display: "block !important" }}
        className="modal-header-custom"
      >
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        <HeadingTwo
          text="Add videos from Brightcove"
          color="#515151"
          className="model-top-heading"
        />
      </Modal.Header>

      <Modal.Body style={{ display: "block !important" }}>
        <div>
          <Tab.Container id="left-tabs-example" defaultActiveKey="manual-1">
            <Row className="video-model-tab-row">
              <Col className="video-model-tab" sm={3}>
                <HeadingThree
                  text="Brightcove CMS"
                  className="nav-menu-heading"
                />
                <Nav variant="pills" className="flex-column">
                  {cms.map((data, counter) => (
                    <div
                      className="role-permission-tab-name"
                      id="role-permission-tab-id"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey={`manual-${counter + 1}`}>
                          {data.account_name}
                          <img className="image-tag" />
                        </Nav.Link>
                      </Nav.Item>
                    </div>
                  ))}
                </Nav>
              </Col>
              <Col className="detail-permission-tab" sm={9}>
                <Tab.Content>
                  {cms.map((data1, counter) => (
                    <div className="for-NetSuite-section">
                      <div className="NetSuite-section-top-header">
                        <div>
                          <HeadingTwo
                            text={data1.account_name}
                            color="#515151"
                            className="NetSuite-heading"
                          />
                        </div>
                        <div className="NetSuite-section-searching">
                          {/* <div
                            className="section-searching-title"
                            style={{ textAlign: "right" }}
                          >
                            <FontAwesomeIcon
                              icon={faCog}
                              className="icon-setting"
                            />
                            <span>Settings</span>
                          </div> */}
                          <div className="section-input-search">
                            <input
                              type="text"
                              placeholder="Search by video ID..."
                            />
                            <button>
                              <FontAwesomeIcon
                                icon={faSearch}
                                color="#084892"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="NetSuite-section-table responsive-table">
                        {/* <table>
                          <thead>
                            <tr>
                              <th></th>
                              <th>Name</th>
                              <th>Created</th>
                              <th>Video</th>
                            </tr>
                          </thead> */}
                        {/* <tbody> */}

                        <Tab.Pane eventKey={`manual-${counter + 1}`}>
                          <Card.Body>
                            <table>
                              <thead>
                                <tr>
                                  <th></th>
                                  <th>Name</th>
                                  <th>Created</th>
                                  <th>Video</th>
                                </tr>
                              </thead>
                              <tbody>
                                {cmsVideo.map((data) => (
                                  <tr>
                                    <td>
                                      <input
                                        name="video"
                                        onChange={() =>
                                          props.setSelectedVideoId(data.id)
                                        }
                                        type="radio"
                                      />
                                    </td>
                                    <td>
                                      <img
                                        src={PreivewImage}
                                        className="image-size"
                                      />
                                      <span>{data.name}</span>
                                    </td>
                                    <td>{data.created_at?.split("T")[0]}</td>
                                    <td>{data.id}</td>
                                    {/* <td>
                                      <input
                                        name="video"
                                        onChange={() =>
                                          props.setSelectedVideoId(data.id)
                                        }
                                        type="radio"
                                      />{" "}
                                      <img
                                        src={PreivewImage}
                                        className="image-size"
                                      />
                                      <span>{data.name}</span>
                                    </td>
                                    <td>{data.created_at?.split("T")[0]}</td>
                                    <td>{data.id}</td> */}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </Card.Body>
                        </Tab.Pane>
                        {/* </tbody> */}
                        {/* </table> */}
                      </div>
                    </div>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="footer-bright-model">
          <div className="model-footer-span">
            <span>Looking to add a new account?</span>
          </div>
          <div className="bright-model-btn">
            <Buttons
              onClick={() => {
                props.setSelectedVideoId("");
                props.onHide();
              }}
              secondary={true}
              text="Cancel"
              width="95px"
              height="32px"
              hover={true}
              className="ml-16"
            />
            <Buttons
              primary={true}
              text="Add File"
              width="106px"
              height="32px"
              hover={true}
              // className="ml-32"
              onClick={() => {
                props.onHide();
              }}
            />
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

BrightcoveModel.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
};

BrightcoveModel.defaultProps = {
  show: false,
};

export default BrightcoveModel;

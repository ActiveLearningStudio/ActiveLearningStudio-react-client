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
const BrightcoveModel = (props) => {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="preview-layout-model"
    >
      <Modal.Header closeButton style={{ display: "block !important" }}>
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
                  <div
                    className="role-permission-tab-name"
                    id="role-permission-tab-id"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="manual-1">
                        Internal
                        <img className="image-tag" />
                      </Nav.Link>
                    </Nav.Item>
                  </div>
                  <div
                    className="role-permission-tab-name"
                    id="role-permission-tab-id"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="manual-2">
                        Production
                        <img className="image-tag" />
                      </Nav.Link>
                    </Nav.Item>
                  </div>

                  <div
                    className="role-permission-tab-name"
                    id="role-permission-tab-id"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="manual-3">
                        Streams
                        <img className="image-tag" />
                      </Nav.Link>
                    </Nav.Item>
                  </div>
                  <div
                    className="role-permission-tab-name"
                    id="role-permission-tab-id"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="manual-4">
                        Marketing
                        <img className="image-tag" />
                      </Nav.Link>
                    </Nav.Item>
                  </div>
                  <div
                    className="role-permission-tab-name"
                    id="role-permission-tab-id"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="manual-5">
                        Sandbox
                        <img className="image-tag" />
                      </Nav.Link>
                    </Nav.Item>
                  </div>
                  <div
                    className="role-permission-tab-name"
                    id="role-permission-tab-id"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="manual-6">
                        ClinicalOne
                        <img className="image-tag" />
                      </Nav.Link>
                    </Nav.Item>
                  </div>
                  <div
                    className="role-permission-tab-name"
                    id="role-permission-tab-id"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="manual-7">
                        NetSuite
                        <img className="image-tag" />
                      </Nav.Link>
                    </Nav.Item>
                  </div>
                  <div
                    className="role-permission-tab-name"
                    id="role-permission-tab-id"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="manual-8">
                        OSPA
                        <img className="image-tag" />
                      </Nav.Link>
                    </Nav.Item>
                  </div>
                </Nav>
              </Col>
              <Col className="detail-permission-tab" sm={9}>
                <Tab.Content>
                  {/* For Authoring */}
                  <Tab.Pane eventKey="manual-1">
                    <Card.Body>
                      <div className="for-NetSuite-section">
                        <div className="NetSuite-section-top-header">
                          <div>
                            <HeadingTwo
                              text="NetSuite"
                              color="#515151"
                              className="NetSuite-heading"
                            />
                          </div>
                          <div className="NetSuite-section-searching">
                            <div
                              className="section-searching-title"
                              style={{ textAlign: "right" }}
                            >
                              <FontAwesomeIcon
                                icon={faCog}
                                className="icon-setting"
                              />
                              <span>Settings</span>
                            </div>
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
                          <table>
                            <thead>
                              <tr>
                                <th>{/* <input type="radio" />{" "} */}</th>
                                <th style={{ width: "280px" }}>Name</th>
                                <th>Created</th>
                                <th>Video</th>
                                <th>Updated</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <input type="radio" />{" "}
                                </td>
                                <td>
                                  <img
                                    src={PreivewImage}
                                    className="image-size"
                                  />
                                  <span>Saved Searches and Logic (SA)</span>
                                </td>
                                <td>07/19/2021</td>
                                <td>18279319726312389172</td>
                                <td>00:40:39</td>
                              </tr>
                              <tr>
                                <td>
                                  <input type="radio" />{" "}
                                </td>
                                <td>
                                  <img
                                    src={PreivewImage}
                                    className="image-size"
                                  />
                                  <span>Saved Searches and Logic (SA)</span>
                                </td>
                                <td>07/19/2021</td>
                                <td>18279319726312389172</td>
                                <td>00:40:39</td>
                              </tr>
                              <tr>
                                <td>
                                  <input type="radio" />{" "}
                                </td>
                                <td>
                                  <img
                                    src={PreivewImage}
                                    className="image-size"
                                  />
                                  <span>Saved Searches and Logic (SA)</span>
                                </td>
                                <td>07/19/2021</td>
                                <td>18279319726312389172</td>
                                <td>00:40:39</td>
                              </tr>
                              <tr>
                                <td>
                                  <input type="radio" />{" "}
                                </td>
                                <td>
                                  <img
                                    src={PreivewImage}
                                    className="image-size"
                                  />
                                  <span>Saved Searches and Logic (SA)</span>
                                </td>
                                <td>07/19/2021</td>
                                <td>18279319726312389172</td>
                                <td>00:40:39</td>
                              </tr>
                              <tr>
                                <td>
                                  <input type="radio" />{" "}
                                </td>
                                <td>
                                  <img
                                    src={PreivewImage}
                                    className="image-size"
                                  />
                                  <span>Saved Searches and Logic (SA)</span>
                                </td>
                                <td>07/19/2021</td>
                                <td>18279319726312389172</td>
                                <td>00:40:39</td>
                              </tr>
                              <tr>
                                <td>
                                  <input type="radio" />{" "}
                                </td>
                                <td>
                                  <img
                                    src={PreivewImage}
                                    className="image-size"
                                  />
                                  <span>Saved Searches and Logic (SA)</span>
                                </td>
                                <td>07/19/2021</td>
                                <td>18279319726312389172</td>
                                <td>00:40:39</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </Card.Body>
                  </Tab.Pane>
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

/*eslint-disable*/
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import "./style.scss";
import HeadingTwo from "utils/HeadingTwo/headingtwo";
import { Accordion, Card, Alert, Tab, Row, Col, Nav } from "react-bootstrap";
import PreivewImage from "assets/images/cardlistimg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
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
          text="Add Videos From Brigtcover"
          color="#515151"
          className="model-top-heading"
        />
      </Modal.Header>

      <Modal.Body style={{ display: "block !important" }}>
        <div>
          <Tab.Container id="left-tabs-example" defaultActiveKey="manual-1">
            <Row className="roles-permission-tab-row">
              <Col className="roles-permission-tab" sm={3}>
                <Nav variant="pills" className="flex-column">
                  <div
                    className="role-permission-tab-name"
                    id="role-permission-tab-id"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="manual-1">
                        Internal - Brightcover CMS
                      </Nav.Link>
                    </Nav.Item>
                  </div>
                  <div
                    className="role-permission-tab-name"
                    id="role-permission-tab-id"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="manual-2">
                        Production - Brightcover CMS
                      </Nav.Link>
                    </Nav.Item>
                  </div>

                  <div
                    className="role-permission-tab-name"
                    id="role-permission-tab-id"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="manual-3">
                        Streams - Brightcover CMS
                      </Nav.Link>
                    </Nav.Item>
                  </div>
                  <div
                    className="role-permission-tab-name"
                    id="role-permission-tab-id"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="manual-4">
                        Marketing - Brightcover CMS
                      </Nav.Link>
                    </Nav.Item>
                  </div>
                  <div
                    className="role-permission-tab-name"
                    id="role-permission-tab-id"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="manual-5">
                        Sandbox - Brightcover CMS
                      </Nav.Link>
                    </Nav.Item>
                  </div>
                  <div
                    className="role-permission-tab-name"
                    id="role-permission-tab-id"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="manual-6">
                        ClinicalOne - Brightcover CMS
                      </Nav.Link>
                    </Nav.Item>
                  </div>
                  <div
                    className="role-permission-tab-name"
                    id="role-permission-tab-id"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="manual-7">
                        NetSuite - Brightcover CMS
                      </Nav.Link>
                    </Nav.Item>
                  </div>
                  <div
                    className="role-permission-tab-name"
                    id="role-permission-tab-id"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="manual-8">
                        OSPA - Brightcover CMS
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
                              text="NetSuite - Brightcover CMS"
                              color="#515151"
                              className="NetSuite-heading"
                            />
                          </div>
                          <div className="NetSuite-section-searching">
                            <div style={{ textAlign: "right" }}>
                              <FontAwesomeIcon icon={faSearch} />
                              <span>Setting</span>
                            </div>
                            <div className="section-input-search">
                              <input
                                type="text"
                                placeholde="Search by video ID..."
                              />
                              <button>Search</button>
                            </div>
                          </div>
                        </div>

                        <div className="NetSuite-section-table responsive-table">
                          <table>
                            <thead>
                              <tr>
                                <th>
                                  <input type="radio" />{" "}
                                </th>
                                <th>Preview</th>
                                <th style={{ width: "280px" }}>Name</th>
                                <th>Date Added</th>
                                <th>Video</th>
                                <th>Duration</th>
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
                                </td>
                                <td>Name</td>
                                <td>Date Added</td>
                                <td>Video</td>
                                <td>Duration</td>
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

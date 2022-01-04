/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import './style.scss';
import HeadingTwo from 'utils/HeadingTwo/headingtwo';
import { Accordion, Card, Alert, Tab, Row, Col, Nav } from 'react-bootstrap';
import PreivewImage from 'assets/images/cardlistimg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCog } from '@fortawesome/free-solid-svg-icons';
import Pagination from 'react-js-pagination';
import HeadingThree from 'utils/HeadingThree/headingthree';
import Buttons from 'utils/Buttons/buttons';
import { useDispatch, useSelector } from 'react-redux';
import { getBrightCMS, getBrightVideos, getBrightVideosSearch } from 'store/actions/videos';
const BrightcoveModel = (props) => {
  const dispatch = useDispatch();
  const [cms, setcms] = useState([]);
  const [cmsVideo, setcmsVideo] = useState([]);
  const [activeCms, setActiveCms] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchId, setSearchId] = useState();

  useEffect(() => {
    (async () => {
      const result = await dispatch(getBrightCMS());
      setcms(result.data);
      setActiveCms(result.data?.[0]);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (activeCms) {
        const videosResult = await dispatch(getBrightVideos(activeCms.id, offset * 6));
        console.log(videosResult);
        setTotalCount(videosResult.meta?.count);
        setcmsVideo(videosResult.data);
      }
    })();
  }, [activeCms, offset]);
  return (
    <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered className="preview-layout-model">
      <Modal.Header style={{ display: 'block !important' }} className="modal-header-custom">
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        <HeadingTwo text="Add videos from Brightcove" color="#515151" className="model-top-heading" />
      </Modal.Header>

      <Modal.Body style={{ display: 'block !important' }}>
        <div>
          <Tab.Container id="left-tabs-example" defaultActiveKey="manual-1">
            <Row className="video-model-tab-row">
              <Col className="video-model-tab" sm={3}>
                <HeadingThree text="Brightcove CMS" className="nav-menu-heading" />
                <Nav variant="pills" className="flex-column">
                  {cms?.map((data, counter) => (
                    <div
                      onClick={() => {
                        setOffset(0);
                        setActiveCms(data);
                      }}
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
                <br />
                <div className="for-NetSuite-section">
                  <div className="NetSuite-section-top-header">
                    <div>
                      <HeadingTwo text={activeCms.account_name} color="#515151" className="NetSuite-heading" />
                    </div>
                    <div className="NetSuite-section-searching">
                      {/* <div className="section-searching-title" style={{ textAlign: 'right' }}>
                            <FontAwesomeIcon icon={faCog} className="icon-setting" />
                            <span>Settings</span>
                          </div> */}
                      <div className="section-input-search">
                        <input value={searchId} onChange={(e) => setSearchId(e.target.value)} type="text" placeholder="Search by video ID..." />
                        <button
                          onClick={async () => {
                            setcmsVideo([]);
                            const videosResult = await dispatch(getBrightVideosSearch(activeCms.id, searchId));
                            setTotalCount(videosResult.meta?.count);
                            setcmsVideo(videosResult.data);
                          }}
                        >
                          <FontAwesomeIcon icon={faSearch} color="#084892" />
                        </button>
                      </div>
                      {searchId && (
                        <button
                          onClick={async () => {
                            setSearchId('');
                            const videosResult = await dispatch(getBrightVideos(activeCms.id, offset * 6));
                            setTotalCount(videosResult.meta?.count);
                            setcmsVideo(videosResult.data);
                          }}
                          className="reset-btn"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="for-NetSuite-section">
                  <div className="NetSuite-section-table responsive-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Created</th>
                          <th>Video</th>
                        </tr>
                      </thead>
                    </table>
                    <Tab.Content>
                      {cms?.map((data1, counter) => (
                        <Tab.Pane eventKey={`manual-${counter + 1}`}>
                          <Card.Body>
                            <table>
                              <tbody>
                                {cmsVideo?.map((data) => (
                                  <tr>
                                    <td>
                                      <input name="video" onChange={() => props.setSelectedVideoId(data.id)} type="radio" />
                                    </td>
                                    <td>
                                      <img src={data?.images?.thumbnail?.src} className="image-size" />
                                      <span>{data.name}</span>
                                    </td>
                                    <td>{data.created_at?.split('T')[0]}</td>
                                    <td>{data.id}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            {cmsVideo?.length && (
                              <Pagination
                                activePage={offset + 1}
                                pageRangeDisplayed={7}
                                itemsCountPerPage={6}
                                totalItemsCount={totalCount}
                                onChange={(e) => {
                                  //const newOffset = offset + 1;
                                  setOffset(e - 1);
                                }}
                              />
                            )}
                          </Card.Body>
                        </Tab.Pane>
                      ))}
                    </Tab.Content>
                  </div>
                </div>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="footer-bright-model">
          <div className="model-footer-span">{/* <span>Looking to add a new account?</span> */}</div>
          <div className="bright-model-btn">
            <Buttons
              onClick={() => {
                props.setSelectedVideoId('');
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

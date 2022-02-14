/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import './style.scss';
import HeadingTwo from 'utils/HeadingTwo/headingtwo';
import { Card, Alert, Tab, Row, Col, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Pagination from 'react-js-pagination';
import HeadingThree from 'utils/HeadingThree/headingthree';
import Buttons from 'utils/Buttons/buttons';
import { useDispatch } from 'react-redux';
import { getBrightCMS, getBrightVideos, getBrightVideosSearch, getKalturaVideos } from 'store/actions/videos';
const BrightcoveModel = (props) => {
  const dispatch = useDispatch();
  const { platform, showSidebar } = props;
  const [cms, setcms] = useState([]);
  const [kaltura, setkaltura] = useState(null);
  const [cmsVideo, setcmsVideo] = useState(null);
  const [activeCms, setActiveCms] = useState(null);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [paginationCounter, setPaginationCounter] = useState(1);
  const [searchId, setSearchId] = useState();
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      if (platform == 'Brightcove') {
        const result = await dispatch(getBrightCMS());

        setcms(result.data);
        setActiveCms(result.data?.[0]);
      } else if (platform == 'Kaltura') {
        setActiveCms(null);
        const result = await dispatch(getKalturaVideos());
        setkaltura(result);
      }
    })();
  }, [platform]);
  useEffect(() => {
    (async () => {
      if (activeCms) {
        await dispatch(getBrightVideos(activeCms.id, offset * 6))
          .then((data) => {
            setTotalCount(data.meta?.count);
            setcmsVideo(data.data);
          })
          .catch((err) => {
            console.log(err);
            if (err?.errors?.length > 0) {
              setError('No record Found');
              setcmsVideo([]);
            }
          });
        if (typeof activeCms === 'object' && activeCms.hasOwnProperty('account_id')) {
          window.brightcoveAccountId = activeCms.account_id;
        }
      }
    })();
  }, [activeCms, offset]);

  useEffect(() => {
    dispatch({
      type: 'EDIT_CMS_SCREEN',
      payload: activeCms,
    });
  }, [activeCms]);
  return (
    <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered className="preview-layout-model">
      <Modal.Header style={{ display: 'block !important' }} className="modal-header-custom">
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        <HeadingTwo text={`Add videos from ${platform}`} color="#515151" className="model-top-heading" />
      </Modal.Header>

      <Modal.Body style={{ display: 'block !important' }}>
        <div>
          <Tab.Container id="left-tabs-example" defaultActiveKey="manual-1">
            <Row className="video-model-tab-row">
              {showSidebar && (
                <Col className="video-model-tab" sm={3}>
                  <HeadingThree text="Brightcove CMS" className="nav-menu-heading" />
                  <Nav variant="pills" className="flex-column">
                    {cms?.map((data, counter) => (
                      <div
                        onClick={() => {
                          setOffset(0);
                          setActiveCms(data);
                          setcmsVideo(null);
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
              )}
              <Col className="detail-permission-tab" sm={showSidebar ? 9 : 12}>
                <br />
                <div className="for-NetSuite-section">
                  <div className="NetSuite-section-top-header">
                    <div>
                      <HeadingTwo text={activeCms?.account_name} color="#515151" className="NetSuite-heading" />
                    </div>
                    <div className="NetSuite-section-searching">
                      <div className="section-input-search">
                        <input value={searchId} onChange={(e) => setSearchId(e.target.value)} type="text" placeholder="Search by video name or id..." />
                        <button
                          onClick={async () => {
                            if (platform == 'Brightcove') {
                              setcmsVideo(null);
                              dispatch(getBrightVideosSearch(activeCms.id, searchId))
                                .then((data) => {
                                  setTotalCount(data.meta?.count);
                                  setcmsVideo(data.data);
                                })
                                .catch((err) => {
                                  if (err?.errors?.length > 0) {
                                    setcmsVideo([]);
                                    setError('No record Found');
                                  }
                                });
                            } else if (platform == 'Kaltura') {
                              setkaltura(null);
                              const result = await dispatch(getKalturaVideos(searchId));
                              setkaltura(result);
                            }
                          }}
                        >
                          <FontAwesomeIcon icon={faSearch} color="#084892" />
                        </button>
                      </div>
                      {
                        <button
                          onClick={async () => {
                            setSearchId('');
                            if (platform == 'Brightcove') {
                              setcmsVideo(null);
                              try {
                                const videosResult = await dispatch(getBrightVideos(activeCms.id, offset * 6));
                                console.log(videosResult);
                                setTotalCount(videosResult.meta?.count);
                                setcmsVideo(videosResult.data);
                              } catch (err) {
                                if (err?.errors?.length > 0) {
                                  setcmsVideo([]);
                                  setError('No record Found');
                                }
                              }
                            } else if (platform == 'Kaltura') {
                              setkaltura(null);
                              const result = await dispatch(getKalturaVideos());
                              setkaltura(result);
                            }
                          }}
                          className="reset-btn"
                        >
                          Reset
                        </button>
                      }
                    </div>
                  </div>
                </div>
                <div className="for-NetSuite-section">
                  <div className="NetSuite-section-table responsive-table">
                    {platform == 'Brightcove' && (
                      <Tab.Content>
                        {cms?.map((data1, counter) => (
                          <Tab.Pane eventKey={`manual-${counter + 1}`}>
                            <Card.Body style={{ padding: '0px' }}>
                              <table>
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Created</th>
                                    <th>Video</th>
                                    <th>Updated At</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {cmsVideo ? (
                                    cmsVideo?.length > 0 ? (
                                      cmsVideo?.map((data) => (
                                        <tr>
                                          <td className="firstname">
                                            <input
                                              name="video"
                                              onChange={() => {
                                                props.setSelectedVideoId(data.id);
                                              }}
                                              type="radio"
                                            />
                                            <img src={data?.images?.thumbnail?.src} className="image-size" />
                                            <span>{data.name}</span>
                                          </td>
                                          <td>{data.created_at?.split('T')[0]}</td>
                                          <td>{data.id}</td>
                                          <td>{data.updated_at?.split('T')[0]}</td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="4">
                                          <Alert variant="danger" colSpan={3}>
                                            {error}
                                          </Alert>
                                        </td>
                                      </tr>
                                    )
                                  ) : (
                                    <tr>
                                      <td colSpan="4">
                                        <Alert variant="primary" colSpan={4}>
                                          Loading...
                                        </Alert>
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>

                              {cmsVideo?.length > 0 && (
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
                    )}
                    {platform == 'Kaltura' && (
                      <Tab.Content>
                        <Tab.Pane eventKey="manual-1">
                          <Card.Body style={{ padding: '0px' }}>
                            <table>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Created</th>
                                  <th>Video Id</th>
                                  <th>Updated At</th>
                                </tr>
                              </thead>
                              <tbody>
                                {kaltura ? (
                                  kaltura.objects?.length > 0 ? (
                                    kaltura?.objects?.map((data) => (
                                      <tr>
                                        <td className="firstname">
                                          <input
                                            name="video"
                                            onChange={() => {
                                              props.setSelectedVideoId(data.dataUrl);
                                            }}
                                            type="radio"
                                          />
                                          <img src={data?.thumbnailUrl} className="image-size" />
                                          <span>{data.name}</span>
                                        </td>
                                        <td>{data.createdAt}</td>
                                        <td>{data.id}</td>
                                        <td>{data.updatedAt}</td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan="4">
                                        <Alert variant="danger" colSpan={3}>
                                          {error}
                                        </Alert>
                                      </td>
                                    </tr>
                                  )
                                ) : (
                                  <tr>
                                    <td colSpan="4">
                                      <Alert variant="primary" colSpan={4}>
                                        Loading...
                                      </Alert>
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>

                            {kaltura?.objects?.length > 0 && (
                              <Pagination
                                activePage={paginationCounter}
                                pageRangeDisplayed={7}
                                itemsCountPerPage={6}
                                totalItemsCount={kaltura?.totalCount}
                                onChange={async (e) => {
                                  setPaginationCounter(e);
                                  const result = await dispatch(getKalturaVideos('', e, 2));
                                  setkaltura(result);
                                }}
                              />
                            )}
                          </Card.Body>
                        </Tab.Pane>
                      </Tab.Content>
                    )}
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

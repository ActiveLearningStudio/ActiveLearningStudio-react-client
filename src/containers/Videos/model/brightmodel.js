/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form } from 'react-bootstrap';
import './style.scss';
import HeadingTwo from 'utils/HeadingTwo/headingtwo';
import { Card, Alert, Tab, Row, Col, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Pagination from 'react-js-pagination';
import HeadingThree from 'utils/HeadingThree/headingthree';
import Buttons from 'utils/Buttons/buttons';
import { useDispatch } from 'react-redux';
import { getBrightCMS, getBrightVideos, getBrightVideosSearch, getKalturaVideos, getVimeoVideos } from 'store/actions/videos';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
const BrightcoveModel = (props) => {
  const dispatch = useDispatch();
  const { platformName, showSidebar, setSelectedVideoIdKaltura, selectedVideoIdVimeo, selectedVideoIdKaltura, selectedVideoId } = props;
  const [cms, setcms] = useState([]);
  const [kaltura, setkaltura] = useState(null);
  const [vimeo, setVimeo] = useState(null);
  const [cmsVideo, setcmsVideo] = useState(null);
  const [activeCms, setActiveCms] = useState(null);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [paginationCounter, setPaginationCounter] = useState(1);
  const [searchId, setSearchId] = useState();
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      setSearchId('');
      if (platformName == 'Brightcove') {
        const result = await dispatch(getBrightCMS());

        setcms(result.data);
        setActiveCms(result.data?.[0]);
      } else if (platformName == 'Kaltura') {
        setActiveCms(null);
        const result = await dispatch(getKalturaVideos());
        if (result?.errors) {
          setkaltura([]);
          setError('No record Found');
        } else {
          setkaltura(result);
        }
      } else if (platformName == 'Vimeo') {
        setActiveCms(null);
        const result = await dispatch(getVimeoVideos());
        if (result?.errors) {
          setVimeo([]);
          setError('No record Found');
        } else {
          setVimeo(result);
          console.log('Result:', result.data);
        }
      }
    })();
  }, [platformName]);

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
  const primaryColor = getGlobalColor('--main-primary-color');
  return (
    <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered className="preview-layout-model">
      <Modal.Header style={{ display: 'block !important' }} className="modal-header-custom">
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        <HeadingTwo text={`Add videos from ${platformName}`} color="#515151" className="model-top-heading" />
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
                        <input value={searchId} onChange={(e) => setSearchId(e.target.value)} type="text" placeholder="Search by video name or video id..." />
                        <button
                          onClick={async () => {
                            if (platformName == 'Brightcove') {
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
                            } else if (platformName == 'Kaltura') {
                              setkaltura(null);
                              setPaginationCounter(1);
                              const result = await dispatch(getKalturaVideos(searchId));
                              if (result.totalCount) {
                                setkaltura(result);
                              } else {
                                setkaltura([]);
                                setError('No record Found');
                              }
                            } else if (platformName == 'Vimeo') {
                              setVimeo(null);
                              setPaginationCounter(1);
                              const result = await dispatch(getVimeoVideos(searchId));
                              if (result.total) {
                                setVimeo(result);
                              } else {
                                setVimeo([]);
                                setError('No record Found');
                              }
                            }
                          }}
                        >
                          <FontAwesomeIcon icon={faSearch} color={primaryColor} />
                        </button>
                      </div>
                      {
                        <button
                          onClick={async () => {
                            setSearchId('');
                            if (platformName == 'Brightcove') {
                              setcmsVideo(null);
                              try {
                                const videosResult = await dispatch(getBrightVideos(activeCms.id, offset * 6));

                                setTotalCount(videosResult.meta?.count);
                                setcmsVideo(videosResult.data);
                              } catch (err) {
                                if (err?.errors?.length > 0) {
                                  setcmsVideo([]);
                                  setError('No record Found');
                                }
                              }
                            } else if (platformName == 'Kaltura') {
                              setkaltura(null);
                              setPaginationCounter(1);
                              const result = await dispatch(getKalturaVideos());
                              setkaltura(result);
                            } else if (platformName == 'Vimeo') {
                              setVimeo(null);
                              setPaginationCounter(1);
                              const result = await dispatch(getVimeoVideos());
                              setVimeo(result);
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
                    {platformName == 'Brightcove' && (
                      <Tab.Content>
                        {cms?.map((data1, counter) => (
                          <Tab.Pane eventKey={`manual-${counter + 1}`}>
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
                                  {cmsVideo ? (
                                    cmsVideo?.length > 0 ? (
                                      cmsVideo?.map((data) => (
                                        <tr>
                                          <td className="firstname">
                                            <Form.Check
                                              type="radio"
                                              id={`default-${data.id}`}
                                              onChange={() => {
                                                props?.setSelectedVideoId(data.id);
                                              }}
                                              checked={selectedVideoId === data.id ? true : false}
                                            />
                                            <div className="first-col-image-name">
                                              <img src={data?.images?.thumbnail?.src} className="image-size" />
                                              <span>{data.name}</span>
                                            </div>
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
                                  onChange={async (e) => {
                                    //const newOffset = offset + 1;
                                    // setPaginationCounter(e);
                                    setOffset(e - 1);
                                    // const result = await dispatch(getBrightVideos('', e, 6));
                                    // setcmsVideo(result);
                                  }}
                                />
                              )}
                            </Card.Body>
                          </Tab.Pane>
                        ))}
                      </Tab.Content>
                    )}
                    {platformName == 'Kaltura' && (
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
                                    kaltura?.objects?.map((data) => {
                                      var created = new Date(data.createdAt);
                                      var update = new Date(data.updatedAt);
                                      return (
                                        <tr>
                                          <td className="firstname">
                                            <input
                                              name="video"
                                              onChange={() => {
                                                setSelectedVideoIdKaltura(data.dataUrl);
                                              }}
                                              type="radio"
                                              checked={selectedVideoIdKaltura === data.dataUrl ? true : false}
                                            />
                                            <img src={data?.thumbnailUrl} className="image-size" />
                                            <span>{data.name}</span>
                                          </td>
                                          <td>{created?.toLocaleDateString()}</td>
                                          <td>{data.id}</td>
                                          <td>{update?.toLocaleDateString()}</td>
                                        </tr>
                                      );
                                    })
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
                                  const result = await dispatch(getKalturaVideos('', e, 6));
                                  setkaltura(result);
                                }}
                              />
                            )}
                          </Card.Body>
                        </Tab.Pane>
                      </Tab.Content>
                    )}

                    {/* Vimeo */}
                    {platformName == 'Vimeo' && (
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
                                {vimeo ? (
                                  vimeo?.data?.length > 0 ? (
                                    vimeo?.data?.map((data) => {
                                      var created = new Date(data.created_time);
                                      var update = new Date(data.modified_time);
                                      return (
                                        <tr>
                                          <td className="firstname">
                                            <input
                                              name="video"
                                              onChange={() => {
                                                props.setSelectedVideoIdVimeo(data.link);
                                              }}
                                              type="radio"
                                              checked={selectedVideoIdVimeo === data.link ? true : false}
                                            />
                                            <img src={data?.pictures?.base_link} className="image-size" />
                                            <span>{data.name}</span>
                                          </td>
                                          <td>{created?.toLocaleDateString()}</td>
                                          <td>{data.uri?.split('/')?.[data.uri.split('/').length - 1]}</td>
                                          <td>{update?.toLocaleDateString()}</td>
                                        </tr>
                                      );
                                    })
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

                            {vimeo?.data?.length > 0 && (
                              <Pagination
                                activePage={paginationCounter}
                                pageRangeDisplayed={7}
                                itemsCountPerPage={6}
                                totalItemsCount={vimeo?.total}
                                onChange={async (e) => {
                                  setPaginationCounter(e);
                                  const result = await dispatch(getVimeoVideos('', e, 6));
                                  setVimeo(result);
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
                setSelectedVideoIdKaltura('');
                props.setSelectedVideoIdVimeo('');
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
              text="Add Video"
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

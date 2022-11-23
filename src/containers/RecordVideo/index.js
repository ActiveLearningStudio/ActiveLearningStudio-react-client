/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Modal } from 'react-bootstrap';
import PageHeadline from './pageHeadline';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import KomodoCard from 'utils/KomodoCard/komodocard';
import SearchInputMdSvg from 'iconLibrary/mainContainer/SearchInputMdSvg';
import { useDispatch, useSelector } from 'react-redux';
import Buttons from 'utils/Buttons/buttons';
import ProjectCardSkeleton from 'components/Skeletons/projectCard';
import { getKomdoVideoList } from 'store/actions/komodo';
import WelcomeScreen from './WelcomeScreen';
import MyActivity from 'containers/MyActivity';
import { toast } from 'react-toastify';
import './style.scss';

const RecordVideoPage = () => {
  const dispatch = useDispatch();
  const { komodoVideoList } = useSelector((state) => state.komodo);
  const { currentOrganization } = useSelector((state) => state.organization);
  const [searchQuery, setSearchQuery] = useState('');

  // const [currentActivity, setCurrentActivity] = useState(null);

  const [activeTab, setActiveTab] = useState('Komodo library');
  const [type, setType] = useState([]);
  const [show, setShow] = useState(false);
  const [ActivePage, setActivePage] = useState(1);

  useEffect(() => {
    if (currentOrganization) {
      dispatch(getKomdoVideoList(currentOrganization.id));
    }
  }, [currentOrganization]);

  const primaryColor = getGlobalColor('--main-primary-color');

  return (
    <>
      <div className="content-wrapper">
        <div className="inner-content">
          <div className="record-page-section">
            <PageHeadline />
            <div className="video-cards-top-search-filter">
              <div className="search-bar-clear-btn">
                <div className="search-bar">
                  <input
                    className=""
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    placeholder="Search recorded videos"
                  />
                  <SearchInputMdSvg
                    primaryColor={primaryColor}
                    onClick={() => {
                      if (currentOrganization) {
                        dispatch(getKomdoVideoList(currentOrganization?.id, ActivePage, 30, searchQuery));
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                <div>
                  <Buttons
                    text="Clear"
                    className="clr-btn"
                    onClick={() => {
                      setSearchQuery('');
                      setActivePage(1);
                      dispatch(getKomdoVideoList(currentOrganization?.id, 1, 30, ''));
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="tab-div">
              <Tabs
                onSelect={(eventKey) => {
                  setType('sample');
                }}
                className="main-tabs"
                defaultActiveKey={activeTab}
                id="uncontrolled-tab-example"
              >
                <Tab eventKey="Komodo library" title="Komodo library">
                  <div className="komodo-lib-section">
                    <>
                      {!komodoVideoList ? (
                        <div className="d-flex ">
                          <ProjectCardSkeleton />
                          <ProjectCardSkeleton />
                          <ProjectCardSkeleton />
                        </div>
                      ) : (
                        <>
                          {komodoVideoList?.data?.length ? (
                            <div className="row">
                              {komodoVideoList?.data?.map((data) => (
                                <div className="mt-16">
                                  <KomodoCard
                                    data={data}
                                    setModalShow={setShow}
                                    // setCurrentActivity={setCurrentActivity}
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <WelcomeScreen />
                          )}
                        </>
                      )}
                    </>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <MyActivity playlistPreview activityPreview redirecttoactivity />
      {/* <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentActivity.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <video width="100%" height="100%" controls>
            <source src={currentActivity.videoUrl} type="video/mp4" />
          </video>
        </Modal.Body>
      </Modal> */}
    </>
  );
};

export default RecordVideoPage;

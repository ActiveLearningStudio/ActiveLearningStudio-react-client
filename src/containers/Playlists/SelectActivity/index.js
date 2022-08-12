/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import { allIndActivity } from 'store/actions/indActivities';
import { Tabs, Tab, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';

import Buttons from 'utils/Buttons/buttons';
import TeamProjectCard from 'utils/TeamProjectCard/teamprojectcard';
import { useDispatch, useSelector } from 'react-redux';

import search from 'services/search.service';

import { addActivityPlaylistSearch } from 'store/actions/playlist';
import loader from 'assets/images/loader.svg';
const ImgLoader = () => <img src={loader} alt="loader" />;
import './style.scss';

const SelectActivity = ({ setSelectSearchModule, playlistIdForSearchingTab, setReloadPlaylist, reloadPlaylist }) => {
  const primaryColor = getGlobalColor('--main-primary-color');
  const secondaryColor = getGlobalColor('--main-secondary-color');
  const [activeTab, setActiveTab] = useState('Ind. Activities');
  const [ActivePage, setActivePage] = useState(1);
  const [defaultSize, setdefaultSize] = useState(30);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectProject, setSelectProject] = useState([]);
  const [allSearchActivities, setAllSearchActivities] = useState(null);
  const { allActivities, islazyLoader } = useSelector((state) => state.activities);
  const dispatch = useDispatch();

  const { currentOrganization } = useSelector((state) => state.organization);

  useEffect(() => {
    (async () => {
      const result = await dispatch(allIndActivity(currentOrganization?.id, 1, defaultSize, ''));
    })();
  }, [currentOrganization]);

  useEffect(() => {
    setAllSearchActivities(allActivities);
  }, [allActivities]);

  window.onscroll = function () {
    var scrollerHeight = document.body.scrollHeight - 1;
    if (allSearchActivities && ActivePage < allSearchActivities?.meta?.last_page) {
      if (window.innerHeight + Math.ceil(window.scrollY) >= scrollerHeight) {
        if (ActivePage === 1) {
          setActivePage(ActivePage + 3);
        } else {
          setActivePage(ActivePage + 1);
        }
      }
    }
  };
  console.log('allSearchActivities', allSearchActivities);
  useEffect(() => {
    if (ActivePage !== 1) {
      dispatch(allIndActivity(currentOrganization?.id, ActivePage, 10, searchQuery));
    }
  }, [ActivePage]);

  return (
    <>
      <div className="content-wrapper">
        <div className="inner-content">
          <div className="content" style={{ minHeight: '764px' }}>
            <div className="organization-name">Curriki Studio</div>
            <div>
              <div className="activity-header">
                <div>
                  <h1 className="title-activity">Add existing activity</h1>
                </div>
                <div
                  className="back-to-project"
                  onClick={() => {
                    setReloadPlaylist(!reloadPlaylist);
                    setSelectSearchModule(false);
                  }}
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-18" color={primaryColor} />
                  <span>Back to project </span>
                </div>
              </div>
              <Tabs onSelect={(eventKey) => {}} className="main-tabs" defaultActiveKey={activeTab} id="uncontrolled-tab-example">
                <Tab eventKey="Ind. Activities" title="My Activities">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="flex-button-top">
                        <div className="team-controller">
                          <div className="search-and-filters">
                            <div className="search-bar">
                              <input
                                type="text"
                                className="search-input"
                                placeholder="Search activity"
                                value={searchQuery}
                                onChange={async (e) => {
                                  setSearchQuery(e.target.value);
                                  setAllSearchActivities(null);
                                  const result = await dispatch(allIndActivity(currentOrganization?.id, 1, 10, e.target.value));

                                  setAllSearchActivities(result);
                                }}
                                // value={searchQuery}
                              />

                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                // onClick={searchQueryHandler}
                              >
                                <path
                                  d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58175 3 3.00003 6.58172 3.00003 11C3.00003 15.4183 6.58175 19 11 19Z"
                                  stroke={primaryColor}
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path d="M21 20.9984L16.65 16.6484" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          </div>

                          <div>
                            <Buttons
                              type="button"
                              text="Move activities"
                              primary
                              width="130px"
                              height="32px"
                              hover
                              disabled={selectProject.length ? false : true}
                              defaultgrey={selectProject.length ? false : true}
                              onClick={async () => {
                                Swal.fire({
                                  html: `Are you sure you want to move these activities?`,
                                  showCancelButton: true,
                                  confirmButtonColor: '#3085d6',
                                  cancelButtonColor: '#d33',
                                  confirmButtonText: 'Yes',
                                  icon: 'info',
                                }).then(async (result) => {
                                  if (result.isConfirmed) {
                                    for (var i = 0; i < selectProject.length; i++) {
                                      await dispatch(addActivityPlaylistSearch(selectProject[i], playlistIdForSearchingTab));

                                      if (selectProject.length === i + 1) {
                                        Swal.fire({
                                          title: 'Your request is being processed.',
                                          text: 'Please refresh after a moment.',
                                          icon: 'success',
                                          showCancelButton: false,
                                          confirmButtonText: 'Close',
                                          customClass: {
                                            confirmButton: 'confirmation-close-btn',
                                          },
                                        });
                                        setReloadPlaylist(!reloadPlaylist);
                                        setSelectSearchModule(false);
                                      }
                                    }
                                  }
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {!allSearchActivities ? (
                        <>
                          <Alert variant="primary" className="alert">
                            Loading...
                          </Alert>
                        </>
                      ) : (
                        <>
                          <div className="list-of-team-projects">
                            {allSearchActivities?.data?.length ? (
                              allSearchActivities?.data.map((item) => {
                                return (
                                  <TeamProjectCard
                                    backgroundImg={item?.thumb_url}
                                    title={item?.title}
                                    className="mrt"
                                    key={item?.id}
                                    selectProject={selectProject}
                                    setSelectProject={setSelectProject}
                                    project={item}
                                    activity
                                  />
                                );
                              })
                            ) : (
                              <Alert variant="danger" className="alert">
                                No Result Found
                              </Alert>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
          {allSearchActivities?.data?.length > 0 && ActivePage !== 1 && islazyLoader && (
            <div className="col-md-12 text-center mt-4">
              <ImgLoader />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectActivity;

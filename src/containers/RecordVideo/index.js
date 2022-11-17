/* eslint-disable import/order */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Alert, Tabs, Tab } from 'react-bootstrap';
import PageHeadline from './pageHeadline';
import Image1 from '../../assets/images/record_1.png';
import Image2 from '../../assets/images/record_2.png';
import './style.scss';
import LoginRecSMSvg from 'iconLibrary/mainContainer/LoginRecSMSvg';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import HelpRecSmSvg from 'iconLibrary/mainContainer/HelpRecSmSvg';
import KomodoCard from 'utils/KomodoCard/komodocard';
import { useDispatch, useSelector } from 'react-redux';
import ProjectCardSkeleton from 'components/Skeletons/projectCard';
import { getKomdoVideoList } from 'store/actions/komodo';

const RecordVideoPage = () => {
  const dispatch = useDispatch();
  const { isLoading, komodoVideoList } = useSelector((state) => state.komodo);

  const [activeTab, setActiveTab] = useState('Komodo library');
  const [type, setType] = useState([]);
  const [komodoList, setKomodoList] = useState([]);

  useEffect(() => {
    dispatch(getKomdoVideoList());
  }, []);

  useEffect(() => {
    setKomodoList([]);
    if (komodoVideoList?.data?.length > 0) {
      setKomodoList(komodoVideoList.data);
    }
  }, [komodoVideoList]);

  const primaryColor = getGlobalColor('--main-primary-color');
  return (
    <>
      <div className="content-wrapper">
        <div className="inner-content">
          <div className="record-page-section">
            <PageHeadline />
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
                    {true ? (
                      <>
                        {isLoading ? (
                          <div className="d-flex ">
                            <ProjectCardSkeleton />
                            <ProjectCardSkeleton />
                            <ProjectCardSkeleton />
                          </div>
                        ) : (
                          <>
                            <div className="row">
                              {komodoList?.map((data) => (
                                <>
                                  <div className="mt-24">
                                    <KomodoCard data={data} />
                                  </div>
                                </>
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="komodo-lib">
                          <div className="komodo-lib-left">
                            <h2>Hello!</h2>
                            <h3>Now you can record a video via Komodo</h3>
                            <div className="lib-left-detail">
                              <p>Komodo helps you collaborate faster and share your ideas with people without the need to type lots of text, and scheduling online meetings.</p>
                              <div className="sub-two">
                                <p>Learn more about Komodo &nbsp; </p>
                                <a href="#">here</a>
                              </div>
                            </div>
                          </div>
                          <div className="komodo-lib-right">
                            <div className="lib-right-div mb-90">
                              <div>
                                <img src={Image1} alt="Image1" />
                              </div>
                              <div className="lib-div-inner">
                                <h3>Get started</h3>
                                <p>Link Komodo features to your CurrikiStudio account and start creating.</p>
                                <button>
                                  <LoginRecSMSvg primaryColor={primaryColor} />
                                  Log in / Sign up
                                </button>
                              </div>
                            </div>
                            <div className="lib-right-div">
                              <div>
                                <img src={Image2} alt="Image1" />
                              </div>
                              <div className="lib-div-inner">
                                <h3>Get started</h3>
                                <ol className="lib-div-inner-ul">
                                  <li>
                                    <p>Record your screen, Cam and talk about whatever you want. </p>
                                  </li>
                                  <li>
                                    <p>Once you finish your recording, copy the link and share it.</p>
                                  </li>
                                </ol>
                                <button>
                                  <HelpRecSmSvg primaryColor={primaryColor} />
                                  Learn more
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordVideoPage;

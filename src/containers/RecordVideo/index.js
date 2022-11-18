/* eslint-disable import/order */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import PageHeadline from './pageHeadline';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import KomodoCard from 'utils/KomodoCard/komodocard';
import { useDispatch, useSelector } from 'react-redux';
import ProjectCardSkeleton from 'components/Skeletons/projectCard';
import { getKomdoVideoList } from 'store/actions/komodo';
import WelcomeScreen from './WelcomeScreen';
import './style.scss';

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
                    <>
                      {isLoading ? (
                        <div className="d-flex ">
                          <ProjectCardSkeleton />
                          <ProjectCardSkeleton />
                          <ProjectCardSkeleton />
                        </div>
                      ) : (
                        <>
                          {komodoList?.length !== 0 ? (
                            <>
                              <div className="row">
                                {komodoList?.map((data) => (
                                  <>
                                    <div className="mt-16">
                                      <KomodoCard data={data} />
                                    </div>
                                  </>
                                ))}
                              </div>
                            </>
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
    </>
  );
};

export default RecordVideoPage;

/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Modal } from 'react-bootstrap';
import PageHeadline from './pageHeadline';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import KomodoCard from 'utils/KomodoCard/komodocard';
import MyVerticallyCenteredModals from 'components/models/videoH5pmodal';
import { useDispatch, useSelector } from 'react-redux';
import intActivityServices from 'services/indActivities.service';
import DescribeVideo from 'containers/Videos/formik/describevideo';
import ProjectCardSkeleton from 'components/Skeletons/projectCard';
import { getKomdoVideoList } from 'store/actions/komodo';
import WelcomeScreen from './WelcomeScreen';
import MyActivity from 'containers/MyActivity';
import { toast } from 'react-toastify';
import './style.scss';

const RecordVideoPage = () => {
  const dispatch = useDispatch();
  const { komodoVideoList } = useSelector((state) => state.komodo);
  const { activeOrganization } = useSelector((state) => state.organization);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [screenStatus, setScreenStatus] = useState('');
  const [currentActivity, setCurrentActivity] = useState(null);
  const [activeTab, setActiveTab] = useState('Komodo library');
  const [type, setType] = useState([]);
  const [show, setShow] = useState(false);
  const [subName, setsubName] = useState('');
  const [authortagName, setauthortagName] = useState('');
  const [eduLevel, seteduLevel] = useState('');
  useEffect(() => {
    if (activeOrganization) {
      dispatch(getKomdoVideoList(activeOrganization.id));
    }
  }, [activeOrganization]);

  const openEditor = async (data) => {
    toast.dismiss();
    toast.info('Loading Activity ...', {
      className: 'project-loading',
      closeOnClick: false,
      closeButton: false,
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 10000,
      icon: '',
    });

    const result = await intActivityServices.intActivityDetail(activeOrganization.id, 66141);
    if (result?.['independent-activity']) {
      toast.dismiss();
      dispatch({
        type: 'SET_ACTIVE_VIDEO_SCREEN',
        payload: result['independent-activity'],
      });

      setScreenStatus('DescribeVideo');
    }
  };

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
                                  <KomodoCard data={data} setModalShow={setShow} setCurrentActivity={setCurrentActivity} />
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
      <MyActivity playlistPreview activityPreview />
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

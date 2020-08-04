import React, { Suspense } from "react";
import { Modal, Tabs, Tab } from "react-bootstrap";
import logo from "../../images/loginlogo.png";
const H5PPreview = React.lazy(() => import("../../containers/H5PPreview"));

export default function MyVerticallyCenteredModal(props) {
  console.log(props);
  return (
    <Modal
      {...props}
      size="lg"
      className="video_activity"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <img src={logo} alt="" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey={props.activeType} id="uncontrolled-tab-example">
          <Tab eventKey="demo" title="Demo">
            {!!props.activity && props.activity.demo_activity_id ? (
              <Suspense fallback={<div>Loading</div>}>
                <H5PPreview
                  resourceid={props.activity.demo_activity_id.trim()}
                  tokenrequire={false}
                  showltipreview={true}
                />
              </Suspense>
            ) : (
              <div className="stayTuned">
                <h1>Stay Tuned!</h1>
                <h5>Demo will be available Soon</h5>
              </div>
            )}
          </Tab>
          <Tab eventKey="video" title="Video">
            {!!props.activity && !!props.activity.demo_video_id ? (
              <iframe
                width="100%"
                height="400"
                src={
                  "https://www.youtube.com/embed/" +
                  (props.activity.demo_video_id.split("/").length > 0 &&
                    props.activity.demo_video_id.split("/")[
                      props.activity.demo_video_id.split("/").length - 1
                    ])
                }
              ></iframe>
            ) : (
              <div className="stayTuned">
                <h1>Stay Tuned!</h1>
                <h5>Video will be available Soon</h5>
              </div>
            )}
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

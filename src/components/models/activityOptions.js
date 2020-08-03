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
            {!!props.activity && (
              <Suspense fallback={<div>Loading</div>}>
                <H5PPreview
                  resourceid={props.activity._id.trim()}
                  tokenrequire={false}
                  showltipreview={true}
                />
              </Suspense>
            )}
          </Tab>
          <Tab eventKey="video" title="Video">
            <iframe
              width="100%"
              height="400"
              src={
                "https://www.youtube.com/embed/" +
                (!!props.activity &&
                  props.activity.demo_video_id.split("/").length > 0 &&
                  props.activity.demo_video_id.split("/")[
                    props.activity.demo_video_id.split("/").length - 1
                  ])
              }
            ></iframe>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

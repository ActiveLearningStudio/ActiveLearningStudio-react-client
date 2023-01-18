/* eslint-disable */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Headings from "curriki-design-system/dist/utils/Headings/headings";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import RecordVideoMdSvg from "iconLibrary/mainContainer/RecordVideoMdSvg";
import OverlayTriggerPop from "utils/OverlayTiggerPop/overlaytiggerpop";
import Buttons from "utils/Buttons/buttons";
import ReactJoyride from "react-joyride";

export default function PageHeadline() {
  const organization = useSelector((state) => state.organization);
  const { user } = useSelector((state) => state.auth);
  const { permission, currentOrganization } = organization;
  const primaryColor = getGlobalColor("--main-primary-color");
  const [steps, setSteps] = useState([
    {
      content: (
        <div>
          <h6>Record a Video</h6>
          <p>
            Komodo is a screencasting solution that helps you
            collaborate faster and share your ideas with people
            without the need to type lots of text, and scheduling
            online meetings.
          </p>
          <div className="steps--message_box">
            <p>
              For more detail visit our help center or komodo official
              site
            </p>
            <div className="message--box_links">
              <a
                href="https://www.currikistudio.org/help/"
                className="mr-12"
                target="_blank"
              >
                Curriki Help
              </a>
              <a href="https://komododecks.com/" target="_blank">
                Komodo Help
              </a>
            </div>
          </div>
        </div>
      ),

      target: ".komodo-ext-btn",
      event: "hover",
      placement: "left-start",
    },
  ]);
  return (
    <>
      <div className="record-headline">
        <div className="title">
          <Headings
            text={`${currentOrganization?.name}`}
            headingType="body2"
            color="#084892"
          />
        </div>
        <div className="heading-komodo-ext">
          <div className="heading-image">
            <RecordVideoMdSvg primaryColor={primaryColor} />
            <Headings
              text="Record a video"
              headingType="h2"
              className="record-title-heading"
              color="#084892"
            />
          </div>
          {permission?.["Record a Video"]?.includes(
            "record-video:edit"
          ) && (
            <div className="komodo-ext-btn">
              {/* <ReactJoyride
                steps={steps}
                disableCloseOnEsc={true}
                disableScrolling={true}
                showSkipButton={true}
                styles={{
                  options: {
                    primaryColor: primaryColor,
                    zIndex: 1000,
                  },
                }}
              /> */}
              <OverlayTriggerPop
                showMessage={"left"}
                icon={faExclamationCircle}
                className="mr-3"
              >
                Komodo is a screencasting solution that helps you
                collaborate faster and share your ideas with people
                without the need to type lots of text, and scheduling
                online meetings. <br />For more detail visit our help center
                or komodo official site.<br/>
                <div class="message--box_links"><a href="https://www.currikistudio.org/help/" class="mr-12" target="_blank">Curriki Help</a>&nbsp;&nbsp;<a href="https://komododecks.com/" target="_blank">Komodo Help</a></div>
              </OverlayTriggerPop>
              {/* <Buttons primary text="Add Komodo extension" iconColor="#FF0000" width="auto" height="32px" hover />
               */}
              <iframe
                style={{
                  marginLeft: "24px",
                }}
                width="165"
                height="55"
                src={`https://komododecks.com/embed/record?partnerId=curriki&trackId=${user?.email}`}
                title="Komodo"
                frameborder="0"
              ></iframe>
            </div>
          )}
        </div>

        <div className="heading-detail">
          <p>
            Komodo allows you to record your screen and create videos
            that you can use in Interactive Videos.
          </p>
        </div>
      </div>
    </>
  );
}

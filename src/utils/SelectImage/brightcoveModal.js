/* eslint-disable  */
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Alert } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import CloseSmSvg from "iconLibrary/mainContainer/CloseSmSvg";
import "utils/uploadselectfile/uploadfile.scss";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import searchIcon from "../../assets/images/svg/search.svg";
import EyeIcon from "assets/images/svg/eye.svg";
import HeadingThree from "utils/HeadingThree/headingthree";
import dotsloader from "../../assets/images/dotsloader.gif";
import { getBrightCoveVideo } from "services/videos.services";

const BrightcoveModal = ({ show, handleClose, addVideo }) => {
  const [videoData, setVideoData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBrightCoveVideo();
        setVideoData(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Brightcove video data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredVideos = videoData.filter((item) =>
    item?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
  );
  const paragraphColor = getGlobalColor(
    "--main-paragraph-text-color"
  );
  return (
    <>
      <Modal
        className="wiley-modal"
        show={show}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="title-close-button">
          <div className="">Add Brightcove video</div>
          <CloseSmSvg
            onClick={handleClose}
            primaryColor={paragraphColor}
          />
        </div>
        <div className="add-video-form">
          <div className="search-container">
            <input
              type="search"
              className="inpur-search"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search video..."
            />
            <img
              src={searchIcon}
              alt="search"
              width={14}
              height={18}
            />
          </div>
          <div className="add-video-form-tabs">
            <Tabs className="main-tabs" id="controlled-tab-example">
              <Tab
                eventKey="Brightcove"
                title="BrightCove"
                className="brightcove-tab"
              >
                {loading ? (
                  <div className="loader-dots">
                    <img src={dotsloader} alt="loading" height={28} />
                  </div>
                ) : filteredVideos.length === 0 ? (
                  <Alert variant="warning">No Video found.</Alert>
                ) : (
                  filteredVideos?.map((video, index) => {
                    return (
                      <div className="data-container" key={index}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <img
                            src={video?.images?.thumbnail?.src}
                            alt="video-image"
                            style={{
                              width: "120px",
                              height: "90px",
                              padding: "5px",
                            }}
                          />
                          <div className="inner-data-container">
                            <HeadingThree
                              text={video?.name}
                              className="video-title"
                            />
                            <p className="video-description">
                              {video?.description}
                            </p>
                            <p className="video-description">
                              License:{" "}
                              <span style={{ color: "#063A75" }}>
                                {"Creative Commons"}
                              </span>
                            </p>
                          </div>
                        </div>
                        <button
                          className="advanced-filter"
                          onClick={() => {
                            addVideo(video);
                          }}
                        >
                          <img src={EyeIcon} alt="eyeIcon" />
                          Add
                        </button>
                      </div>
                    );
                  })
                )}
              </Tab>
            </Tabs>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BrightcoveModal;

/* eslint-disable  */
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Alert } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import CloseSmSvg from "iconLibrary/mainContainer/CloseSmSvg";
import "utils/uploadselectfile/uploadfile.scss";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import searchIcon from "../../assets/images/svg/search.svg";
import crossIcon from "../../assets/images/svg/cross-icon.svg";
import EyeIcon from "assets/images/svg/eye.svg";
import HeadingThree from "utils/HeadingThree/headingthree";
import dotsloader from "../../assets/images/dotsloader.gif";
import multimedia from "../../assets/images/multimedia-icon-overlay.png";
import { getBrightCoveVideo } from "services/videos.services";
import Pagination from "react-js-pagination";

const BrightcoveModal = ({ show, handleClose, details }) => {
  const [videoData, setVideoData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isloading, setisLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isError, setError] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [previewVideo, setPreviewVideo] = useState("");
  const [clipStartTime, setClipStartTime] = useState("");
  const [clipEndTime, setClipEndTime] = useState("");
  const Limit = 6;

  // function millisecondsToMinutesAndSeconds(ms) {
  //   const minutes = Math.floor(ms / 60000);
  //   const seconds = ((ms % 60000) / 1000).toFixed(0);

  //   return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  // }

  const srtSearch = details.supportStartEndTime;
  const fetchData = async (limit, offset) => {
    try {
      const data = await getBrightCoveVideo(
        limit,
        offset,
        searchQuery,
        srtSearch
      );
      setVideoData(data.data);
      setisLoading(false);
      setError(false);

      const count = data?.meta.count;
      setTotalCount(count);
    } catch (err) {
      if (err?.errors?.length > 0) {
        setError("No record Found");
        setVideoData([]);
      }
      setisLoading(false);
      setError(true);
    }
  };
  const handleClearSearch = async () => {
    setSearchValue("");
    setSearchQuery("");
    setisLoading(true);
    setCurrentPage(1);
  };
  useEffect(() => {
    const getData = async () =>
      await fetchData(Limit, (currentPage - 1) * Limit);
    getData();
  }, [searchValue, currentPage]);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length === 0) {
      setSearchValue("");
    }
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setisLoading(true);
  };
  const paragraphColor = getGlobalColor(
    "--main-paragraph-text-color"
  );
  function parseTimeString(timeString) {
    if (timeString) {
      var timeParts = timeString?.split(":");
      var hours = parseInt(timeParts[0], 10);
      var minutes = parseInt(timeParts[1], 10);
      var secondsAndMilliseconds = timeParts[2].split(".");
      var seconds = parseInt(secondsAndMilliseconds[0], 10);

      return (
        (hours ? hours + " hours " : "") +
        (minutes ? minutes + " minutes " : "") +
        seconds +
        " seconds"
      );
    } else {
      return "";
    }
  }
  function getTotalSecondsFromTime(timeString) {
    const [hours, minutes, seconds] = timeString
      .split(":")
      .map(parseFloat);
    const [secondsPart, millisecondsPart] = String(seconds)?.split(
      "."
    );
    const totalSeconds =
      hours * 3600 + minutes * 60 + parseFloat(secondsPart);
    return Math.floor(totalSeconds - 10);
  }
  function convertTimeToSeconds(timeString) {
    const [hours, minutes, seconds] = timeString
      .split(":")
      .map(parseFloat);
    const totalTimeinSec =
      hours * 3600 + minutes * 60 + parseFloat(seconds);
    return Math.ceil(totalTimeinSec);
  }

  function handleStartTimeChange(e) {
    const timeInSeconds = convertTimeToSeconds(e.target.value);
    setClipStartTime(timeInSeconds);
  }

  function handleEndTimeChange(e) {
    const timeInSeconds = convertTimeToSeconds(e.target.value);
    setClipEndTime(timeInSeconds);
  }
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
          <div className="">
            {previewVideo
              ? previewVideo?.name + " ( Preview ) "
              : "Video Catalog"}
          </div>
          <CloseSmSvg
            onClick={() => {
              setPreviewVideo();
              handleClose();
            }}
            primaryColor={paragraphColor}
          />
        </div>
        {previewVideo ? (
          <div className="videoPreviewC2E">
            <iframe
              controls={true}
              src={`https://players.brightcove.net/${previewVideo.account_id}/default_default/index.html?videoId=${previewVideo.id}#t=${previewVideo?.startTime}`}
              width="720"
              height="420"
              allow="encrypted-media"
              crossorigin="anonymous"
            />
            <div className="videoPreviewFooter">
              <div className="timeInput-container">
                <div className="clip-inputs">
                  <span>Clip starts at : </span>
                  <input
                    type="text"
                    className="timerInput"
                    pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
                    placeholder="HH:MM:SS"
                    onChange={handleStartTimeChange}
                  />
                </div>
                <div className="clip-inputs">
                  <span>Clip end at : </span>
                  <input
                    type="text"
                    className="timerInput"
                    pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
                    placeholder="HH:MM:SS"
                    onChange={handleEndTimeChange}
                  />
                </div>
              </div>
              <div className="flex">
                <button
                  className="curriki-utility curriki-theme-hover backPreview"
                  onClick={() => {
                    setPreviewVideo();
                  }}
                >
                  {" "}
                  Back
                </button>
                <button
                  className="curriki-utility curriki-theme-hover"
                  onClick={() => {
                    details.callback({
                      brightcoveVideoID: previewVideo.id,
                      startVideoAt: clipStartTime,
                      endVideoAt: clipEndTime,
                    });
                    handleClose();
                  }}
                >
                  {" "}
                  Add Clip
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="add-video-form">
            <div className="search-container">
              <input
                type="text"
                className="inpur-search"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="search for clips..."
              />
              {searchQuery && (
                <img
                  src={crossIcon}
                  alt="cross"
                  onClick={handleClearSearch}
                />
              )}
              <img
                onClick={() => {
                  if (searchQuery) {
                    setSearchValue(searchQuery);
                    setisLoading(true);
                  }
                }}
                src={searchIcon}
                alt="search"
                style={{ marginLeft: "10px" }}
              />
            </div>
            <div className="add-video-form-tabs">
              <Tabs className="main-tabs" id="controlled-tab-example">
                <Tab
                  eventKey="Brightcove"
                  title="Video Clips"
                  className="brightcove-tab"
                >
                  {isloading ? (
                    <div className=" pagination-div">
                      <img
                        src={dotsloader}
                        alt=""
                        className="loader"
                        style={{ width: "8%" }}
                      />
                    </div>
                  ) : videoData?.length == 0 ? (
                    <Alert variant="warning">No Videos Found</Alert>
                  ) : (
                    <>
                      <div key={"1"} className="video-list-container">
                        {videoData?.map((video, index) => {
                          return (
                            <div
                              className="data-container"
                              key={index}
                            >
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
                                  crossorigin="anonymous"
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

                                  {!!video?.srt_content &&
                                    video.srt_content
                                      ?.split(",")
                                      ?.map((data) => {
                                        if (!data) return;
                                        return (
                                          <div className="meta">
                                            <span>
                                              Clip starts at :{" "}
                                            </span>
                                            <p>
                                              {parseTimeString(
                                                data?.split("-")?.[1]
                                              )}
                                            </p>
                                            <img
                                              onClick={() => {
                                                setPreviewVideo({
                                                  ...video,
                                                  startTime: getTotalSecondsFromTime(
                                                    data?.split(
                                                      "-"
                                                    )?.[1]
                                                  ),
                                                });
                                              }}
                                              src={multimedia}
                                            />
                                          </div>
                                        );
                                      })}
                                  {/* <p className="video-description">
                                  duration:
                                  {millisecondsToMinutesAndSeconds(
                                    video?.duration
                                  )}
                                </p> */}
                                </div>
                              </div>
                              <button
                                className="advanced-filter"
                                onClick={() => {
                                  details.callback({
                                    brightcoveVideoID: video.id,
                                  });
                                  handleClose();
                                }}
                              >
                                <img src={EyeIcon} alt="eyeIcon" />
                                Add
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      {srtSearch && !searchValue ? (
                        <Pagination
                          activePage={currentPage}
                          itemsCountPerPage={Limit}
                          totalItemsCount={totalCount}
                          pageRangeDisplayed={5}
                          onChange={handlePageChange}
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      ) : !srtSearch ? (
                        <Pagination
                          activePage={currentPage}
                          itemsCountPerPage={Limit}
                          totalItemsCount={totalCount}
                          pageRangeDisplayed={5}
                          onChange={handlePageChange}
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      ) : (
                        ""
                      )}
                    </>
                  )}
                </Tab>
              </Tabs>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default BrightcoveModal;

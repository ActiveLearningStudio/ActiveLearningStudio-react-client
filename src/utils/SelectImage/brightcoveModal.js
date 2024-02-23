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
import { getBrightCoveVideo } from "services/videos.services";

const BrightcoveModal = ({ show, handleClose, details }) => {
  const [videoData, setVideoData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isloading, setisLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  const [isError, setError] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const Limit = 6;

  function millisecondsToMinutesAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);

    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  //to handle the previous page click
  const handlePrevPage = async () => {
    setisLoading(true);
    if (currentPage > 1) {
      const page = currentPage - 1;
      const offset = (page - 1) * 10;
      setCurrentCount(offset);

      await fetchData(Limit, offset);

      setCurrentPage(page);
    }
  };

  //to handle the next page click

  const handleNextPage = async () => {
    setisLoading(true);

    const page = currentPage + 1;
    setCurrentPage(page);
    const offset = (page - 1) * 10;
    setCurrentCount(offset);

    await fetchData(Limit, offset);
  };

  const fetchData = async (limit, offset) => {
    try {
      const data = await getBrightCoveVideo(
        limit,
        offset,
        searchQuery
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
    setSearchQuery("");
    setSearchValue("");
    setisLoading(true);
    await fetchData(Limit, 0);
    setError(false);
  };
  useEffect(() => {
    const getData = async () => await fetchData(Limit, 0);

    getData();
  }, [searchValue]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

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
              type="text"
              className="inpur-search"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search video..."
            />
            {searchQuery && (
              <img
                src={crossIcon}
                alt="cross"
                onClick={handleClearSearch}
              />
            )}
            <img
              onClick={() => setSearchValue(searchQuery)}
              src={searchIcon}
              alt="search"
              style={{ marginLeft: "10px" }}
            />
          </div>
          <div className="add-video-form-tabs">
            <Tabs className="main-tabs" id="controlled-tab-example">
              <Tab
                eventKey="Brightcove"
                title="BrightCove"
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
                                <p className="video-description">
                                  duration:
                                  {millisecondsToMinutesAndSeconds(
                                    video?.duration
                                  )}
                                </p>
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
                    <div className="pagination-button-alignmnet">
                      {(currentPage - 1) * Limit < Limit ? (
                        <div></div>
                      ) : (
                        <button
                          id="1"
                          onClick={handlePrevPage}
                          className=" pagination-button"
                        >
                          Prev Page
                        </button>
                      )}
                      {currentCount + Limit < totalCount ? (
                        <button
                          id="2"
                          onClick={handleNextPage}
                          className=" pagination-button"
                        >
                          Next Page
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
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

/* eslint-disable */

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CloseSmSvg from "iconLibrary/mainContainer/CloseSmSvg";
import searchIcon from "../../assets/images/svg/search.svg";
import filterIcon from "../../assets/images/svg/advanced_filter.svg";
import EyeIcon from "../../assets/images/svg/eye.svg";
import ListIcon from "iconLibrary/dropDown/listIcon";
import NonListIcon from "iconLibrary/dropDown/NonListIcon";
import oracle from "assets/images/oracle.png";
import Buttons from "utils/Buttons/buttons";
import HeadingThree from "utils/HeadingThree/headingthree";

const SearchVideoModal = ({
  show,
  handleClose,
  description,
  license,
}) => {
  const paragraphColor = getGlobalColor(
    "--main-paragraph-text-color"
  );
  const [mediaType, setMediaType] = useState("");
  const [TabValue, setTabValue] = useState(0);
  const [activeListButton, setActiveListButton] = useState("list");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (event) => {
    setMediaType(event.target.value);
  };

  return (
    <Modal
      className="wiley-modal"
      show={show}
      backdrop="static"
      keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="searchVideo-header">
        <div className="">Search Video Library</div>
        <div className="thumb-close-button">
          <CloseSmSvg
            onClick={handleClose}
            primaryColor={paragraphColor}
          />
        </div>
      </div>
      <Modal.Body>
        <div className="header-container">
          <Box sx={{ minWidth: 130 }}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ top: -9 }}
              >
                Media Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={mediaType}
                label="mediaType"
                onChange={handleChange}
                sx={{ height: 32 }}
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="video">Video</MenuItem>
                <MenuItem value="audio">Audio</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div className="search-container">
            <input
              type="search"
              className="inpur-search"
              placeholder="The Scientific Revolution + Telescope (1608) - Allowed closer observ.."
            />
            <img
              src={searchIcon}
              alt="search"
              width={14}
              height={18}
            />
          </div>
          <button className="advanced-filter" onClick={() => {}}>
            <img src={filterIcon} alt="filterIcon" />
            Advanced Filters
          </button>
        </div>
        <div className="filter-container">
          <div className="result-container">
            Results <span className="sorting">Sort By:</span>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <NativeSelect defaultValue="relevance">
                  <option value="relevance">Relevance</option>
                  <option value="relevance">Relevance2</option>
                  <option value="relevance">Relevance3</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </div>

          <div className="list-button-container">
            <button
              onClick={() => setActiveListButton("nonList")}
              className={`list-buttons ${
                activeListButton === "nonList" ? "active" : ""
              }`}
            >
              <NonListIcon
                primaryColor={`${
                  activeListButton === "nonList" ? "#fff" : ""
                }`}
              />
            </button>
            <button
              onClick={() => setActiveListButton("list")}
              className={`list-buttons ${
                activeListButton === "list" ? "active" : ""
              }`}
            >
              <ListIcon
                primaryColor={`${
                  activeListButton === "list" ? "#fff" : ""
                }`}
              />
            </button>
          </div>
        </div>
        <div className="search-video-tabs">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={TabValue}
                onChange={handleTabChange}
                className="video-main-tabs"
              >
                <Tab label="All" {...a11yProps(0)} />
                <Tab label="Wiley" {...a11yProps(1)} />
                <Tab label="YouTube" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={TabValue} index={0}>
              <div className="video-list-container">
                <img src={oracle} />
                <div>
                  <HeadingThree
                    text="The Galileo Project - Rice University"
                    className="video-title"
                  />
                  <p className="video-description">
                    {description
                      ? description
                      : `Contains information on Galileo's improvements to
                    the telescope, including facts, images of early
                    telescopes, and quotes from Galileo's writings
                    describing his work.`}
                  </p>
                  <p className="video-description">
                    License:{" "}
                    <span style={{ color: "#063A75" }}>
                      {license ? license : "Creative Commons"}
                    </span>
                  </p>
                </div>
                <button
                  className="advanced-filter"
                  onClick={() => {}}
                >
                  <img src={EyeIcon} alt="eyeIcon" />
                  Preview
                </button>
              </div>
              <div className="video-list-container">
                <img src={oracle} />
                <div>
                  <HeadingThree
                    text="The Galileo Project - Rice University"
                    className="video-title"
                  />
                  <p className="video-description">
                    {description
                      ? description
                      : `Contains information on Galileo's improvements to
                    the telescope, including facts, images of early
                    telescopes, and quotes from Galileo's writings
                    describing his work.`}
                  </p>
                  <p className="video-description">
                    License:{" "}
                    <span style={{ color: "#063A75" }}>
                      {license ? license : "Creative Commons"}
                    </span>
                  </p>
                </div>
                <button
                  className="advanced-filter"
                  onClick={() => {}}
                >
                  <img src={EyeIcon} alt="eyeIcon" />
                  Preview
                </button>
              </div>
              <div className="video-list-container">
                <img src={oracle} />
                <div>
                  <HeadingThree
                    text="The Galileo Project - Rice University"
                    className="video-title"
                  />
                  <p className="video-description">
                    {description
                      ? description
                      : `Contains information on Galileo's improvements to
                    the telescope, including facts, images of early
                    telescopes, and quotes from Galileo's writings
                    describing his work.`}
                  </p>
                  <p className="video-description">
                    License:{" "}
                    <span style={{ color: "#063A75" }}>
                      {license ? license : "Creative Commons"}
                    </span>
                  </p>
                </div>
                <button
                  className="advanced-filter"
                  onClick={() => {}}
                >
                  <img src={EyeIcon} alt="eyeIcon" />
                  Preview
                </button>
              </div>
              <div className="video-list-container">
                <img src={oracle} />
                <div>
                  <HeadingThree
                    text="The Galileo Project - Rice University"
                    className="video-title"
                  />
                  <p className="video-description">
                    {description
                      ? description
                      : `Contains information on Galileo's improvements to
                    the telescope, including facts, images of early
                    telescopes, and quotes from Galileo's writings
                    describing his work.`}
                  </p>
                  <p className="video-description">
                    License:{" "}
                    <span style={{ color: "#063A75" }}>
                      {license ? license : "Creative Commons"}
                    </span>
                  </p>
                </div>
                <button
                  className="advanced-filter"
                  onClick={() => {}}
                >
                  <img src={EyeIcon} alt="eyeIcon" />
                  Preview
                </button>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={TabValue} index={1}>
              <div className="video-list-container">
                <img src={oracle} />
                <div>
                  <HeadingThree
                    text="The Galileo Project - Rice University"
                    className="video-title"
                  />
                  <p className="video-description">
                    {description
                      ? description
                      : `Contains information on Galileo's improvements to
                    the telescope, including facts, images of early
                    telescopes, and quotes from Galileo's writings
                    describing his work.`}
                  </p>
                  <p className="video-description">
                    License:{" "}
                    <span style={{ color: "#063A75" }}>
                      {license ? license : "Creative Commons"}
                    </span>
                  </p>
                </div>
                <button
                  className="advanced-filter"
                  onClick={() => {}}
                >
                  <img src={EyeIcon} alt="eyeIcon" />
                  Preview
                </button>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={TabValue} index={2}>
              <div className="video-list-container">
                <img src={oracle} />
                <div>
                  <HeadingThree
                    text="The Galileo Project - Rice University"
                    className="video-title"
                  />
                  <p className="video-description">
                    {description
                      ? description
                      : `Contains information on Galileo's improvements to
                    the telescope, including facts, images of early
                    telescopes, and quotes from Galileo's writings
                    describing his work.`}
                  </p>
                  <p className="video-description">
                    License:{" "}
                    <span style={{ color: "#063A75" }}>
                      {license ? license : "Creative Commons"}
                    </span>
                  </p>
                </div>
                <button
                  className="advanced-filter"
                  onClick={() => {}}
                >
                  <img src={EyeIcon} alt="eyeIcon" />
                  Preview
                </button>
              </div>
            </CustomTabPanel>
          </Box>
        </div>
        <div className="footer-buttons">
          <Buttons
            className="advanced-filter"
            text="Cancel"
            secondary
            height="36px"
            onClick={() => {}}
          />
          <Buttons
            className="advanced-filter"
            text="Insert Selected"
            primary
            height="36px"
            icon={faPlus}
            onClick={() => {}}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SearchVideoModal;

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

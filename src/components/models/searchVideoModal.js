/* eslint-disable */

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Dropdown } from "react-bootstrap";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import CloseSmSvg from "iconLibrary/mainContainer/CloseSmSvg";
import searchIcon from "../../assets/images/svg/search.svg";
import filterIcon from "../../assets/images/svg/advanced_filter.svg";

const SearchVideoModal = ({ show, handleClose }) => {
  const paragraphColor = getGlobalColor(
    "--main-paragraph-text-color"
  );
  const [selectedOption, setSelectedOption] = useState("Media Type");

  const handleSelect = (option) => {
    setSelectedOption(option);
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
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-primary"
              id="media-dropdown"
            >
              {selectedOption}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onSelect={() => handleSelect("Text")}>
                Text
              </Dropdown.Item>
              <Dropdown.Item onSelect={() => handleSelect("Video")}>
                Video
              </Dropdown.Item>
              <Dropdown.Item onSelect={() => handleSelect("Audio")}>
                Audio
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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

          <div className="advanced-filter" onClick={() => {}}>
            <img src={filterIcon} alt="filterIcon" />
            Advanced Filters
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SearchVideoModal;

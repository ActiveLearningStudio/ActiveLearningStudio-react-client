/*eslint-disable*/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Dropdown } from "react-bootstrap";
import {
  faEllipsisV,
  faEye,
  faEdit,
  faPlusSquare,
  faCopy,
  faTrash,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
// import { useDispatch } from "react-redux";
import "./projectlistdropdown.scss";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";

const ProjectListDropDown = ({ iconColor, children }) => {
  const IconColor = iconColor ? iconColor : "#084892";
  // const dispatch = useDispatch();
  return (
    <div className="curriki-utility-list-dropdown">
      <Dropdown className="listproject-dropdown check ">
        <Dropdown.Toggle className="project-dropdown-btn-list">
          <span>
            2 projects
            <FontAwesomeIcon
              icon={faAngleDown}
              style={{ marginLeft: "11px" }}
              color="#084892"
            />
          </span>
          {/* <button style={{ width: "108px", height: "32px" }}>
            <FontAwesomeIcon
              icon={faFolderOpen}
              style={{ marginRight: "12px" }}
              color="#084892"
            />
            2 projects
          </button> */}
        </Dropdown.Toggle>

        <Dropdown.Menu className="project-menu-list">
          <div className="projectlist-title">
            <p>This activity is shared in the following projects:</p>
          </div>

          <Dropdown.Item>
            <div className="list-project">
              <button>Design, Art & History</button>
            </div>
          </Dropdown.Item>
          <Dropdown.Item>
            <div className="list-project">
              <button>Project name #2</button>
            </div>
          </Dropdown.Item>
          <Dropdown.Item>
            <div className="list-project">
              <button>Project name #</button>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ProjectListDropDown;

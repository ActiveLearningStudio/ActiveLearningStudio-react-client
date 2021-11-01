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
} from "@fortawesome/free-solid-svg-icons";
import "./activityprojectdropdown.scss";
import { propTypes } from "react-bootstrap/esm/Image";

const ActivityProjectCardDropDown = ({ iconColor }) => {
  const IconColor = iconColor ? iconColor : "#084892";

  return (
    <div className="curriki-utility-activity-project-dropdown">
      <Dropdown className="activity-dropdown check ">
        <Dropdown.Toggle className="activity-dropdown-btn">
          <FontAwesomeIcon
            icon={faEllipsisV}
            style={{ fontSize: "13px", color: IconColor, marginLeft: "5px" }}
          />
          {/* <span>EditActivity</span> */}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
            <a className="links " href="#">
              Project #1
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a className="links " href="#">
              Project #2
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a className="links " href="#">
              Project #3
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a className="links " href="#">
              Project #4
            </a>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ActivityProjectCardDropDown;

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
import "./activitycarddropdown.scss";
import { propTypes } from "react-bootstrap/esm/Image";

const ActivityCardDropDown = ({ iconColor }) => {
  const IconColor = iconColor ? iconColor : "#084892";

  return (
    <div className="curriki-utility-activity-dropdown">
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
            <FontAwesomeIcon icon={faEdit} className="mr-2" />
            Edit
          </Dropdown.Item>
          <Dropdown.Item>
            <FontAwesomeIcon icon={faPlusSquare} className="mr-2" />
            Add to a project
          </Dropdown.Item>
          <Dropdown.Item>
            <FontAwesomeIcon icon={faCopy} className="mr-2" />
            Duplicate
          </Dropdown.Item>
          <Dropdown.Item>
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ActivityCardDropDown;

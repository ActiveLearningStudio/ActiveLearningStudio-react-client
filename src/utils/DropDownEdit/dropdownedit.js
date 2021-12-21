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
import { useDispatch } from "react-redux";
import "./dropdownedit.scss";
import { cloneActivity } from "store/actions/search";
import Swal from "sweetalert2";

const DropDownEdit = ({ iconColor, videoId }) => {
  const IconColor = iconColor ? iconColor : "#084892";
  const dispatch = useDispatch();
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
          <Dropdown.Item
          // onClick={() => {
          //   Swal.showLoading();
          //   cloneActivity(videoId, resource.id);
          // }}
          >
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

export default DropDownEdit;

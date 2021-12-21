/*eslint-disable*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Swal from 'sweetalert2';
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { faEllipsisV, faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteVideo } from 'store/actions/videos';

import './dropdownedit.scss';

const DropDownEdit = ({ iconColor, data }) => {
  const IconColor = iconColor ? iconColor : '#084892';
  const dispatch = useDispatch();
  return (
    <div className="curriki-utility-activity-dropdown">
      <Dropdown className="activity-dropdown check ">
        <Dropdown.Toggle className="activity-dropdown-btn">
          <FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: '13px', color: IconColor, marginLeft: '5px' }} />
          {/* <span>EditActivity</span> */}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
            <FontAwesomeIcon icon={faCopy} className="mr-2" />
            Duplicate
          </Dropdown.Item>
          <Dropdown.Item
            className
            onClick={() => {
              Swal.fire({
                title: 'Are you sure you want to delete this activity?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: 'No',
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(deleteVideo(data.id));
                }
              });
            }}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropDownEdit;

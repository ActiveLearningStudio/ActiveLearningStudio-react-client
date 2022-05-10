/*eslint-disable*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Swal from 'sweetalert2';
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { faEllipsisV, faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteVideo, cloneh5pvideo } from 'store/actions/videos';

import './dropdownedit.scss';

const DropDownEdit = ({ iconColor, data, activities }) => {
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
          <Dropdown.Item
            onClick={async () => {
              toast.info('Duplicating project...', {
                className: 'project-loading',
                closeOnClick: false,
                closeButton: false,
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 10000,
                icon: '',
              });
              const result = await dispatch(cloneh5pvideo(data.id));
              toast.dismiss();
              Swal.fire({
                html: result.message,
                icon: 'success',
              });
            }}
          >
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

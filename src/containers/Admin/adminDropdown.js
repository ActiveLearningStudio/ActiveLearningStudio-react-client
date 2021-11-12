// import React, { useState, useEffect } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import { getProjectId, googleShare } from 'store/actions/gapi';
// import { cloneProject } from 'store/actions/search';
// import {
//   getProjectCourseFromLMS,
// } from 'store/actions/project';
// import { lmsPlaylist } from 'store/actions/playlist';
import './style.scss';
// import loader from 'assets/images/loader.svg';
import Delete from '../../assets/images/menu-dele.svg';
import Edit from '../../assets/images/menu-edit.svg';
import MenuLogo from '../../assets/images/menu-logo.svg';

const AdminDropdown = (props) => {
  const {
    project,
    showDeletePopup,
    teamPermission,
    // text,
    // iconColor,
  } = props;
  // const ImgLoader = () => <img src={loader} alt="loader" />;
  const organization = useSelector((state) => state.organization);
  const { permission } = organization;
  // const dispatch = useDispatch();
  // const AllLms = useSelector((state) => state.share);
  // const [allLms, setAllLms] = useState([]);
  // useEffect(() => {
  //   setAllLms(AllLms);
  // }, [AllLms]);

  return (
    <Dropdown className="project-dropdown check d-flex  align-items-center text-added-project-dropdown">
      <Dropdown.Toggle className="project-dropdown-btn project d-flex justify-content-center align-items-center">
        {/* <FontAwesomeIcon
          icon="ellipsis-v"
          style={{
            fontSize: '13px',
            color: iconColor || '#084892',
            marginLeft: '5px',
          }}
        /> */}
        {/* <span>{text}</span> */}
        <img src={MenuLogo} alt="menu" />
      </Dropdown.Toggle>

      <Dropdown.Menu className="menu">
        <Dropdown.Item>
          <img src={Edit} alt="Preview" className="menue-img" />
          Edit
        </Dropdown.Item>
        {(teamPermission && Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:remove-project') : permission?.Project?.includes('project:delete')) && (
          <Dropdown.Item to="#" onClick={() => showDeletePopup(project.id, project.name, 'Project')}>
            <img src={Delete} alt="Preview" className="menue-img" />
            Delete
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

AdminDropdown.propTypes = {
  project: PropTypes.object.isRequired,
  showDeletePopup: PropTypes.func.isRequired,
  // handleShow: PropTypes.func.isRequired,
  // setProjectId: PropTypes.func.isRequired,
  teamPermission: PropTypes.object.isRequired,
  // iconColor: PropTypes.string.isRequired,
  // text: propTypes.string,
};

// AdminDropdown.defaultProps = {
//   text: propTypes.string,
// };

export default AdminDropdown;

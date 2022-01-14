import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditTeamImage from 'assets/images/svg/editTeam.svg';
import EditDetailImage from 'assets/images/svg/detailEdit.svg';
import searchimg from 'assets/images/svg/search-icon-admin-panel.svg';
import './style.scss';
import { useHistory } from 'react-router-dom';
import Buttons from 'utils/Buttons/buttons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import UserIcon from 'assets/images/svg/user.svg';
import Deleticon from 'assets/images/svg/trash.svg';
import Right from 'assets/images/svg/right.svg';
// import MyTeamCard from 'utils/MyTeamCard/myteamcard';
import ProjectCard from 'containers/Projects/ProjectCard';
// import BackgroundTeamCardImage from 'assets/images/cardlistimg.png';

const TeamDetail = ({ team, organization }) => {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const [createProject, setCreateProject] = useState(false);
  const [editMode, seteditMode] = useState(false);
  console.log(team, show, createProject, editMode);
  const handleShow = () => {
    setShow(true);
  };

  const setProjectId = () => { };
  const showDeletePopup = () => { };
  const [toggleLeft, setToggleLeft] = useState(false);
  return (
    <div className="add-team-page">
      <div className={`${toggleLeft ? 'width90' : ''} left`}>
        <div className="organization-name">{organization?.name}</div>
        <div className="title-image">
          <div>
            <h1 className="title">{team?.name}</h1>
          </div>
          <div>
            <img
              className="editimage-tag"
              src={EditTeamImage}
              alt="EditTeamImage"
            />
          </div>
        </div>
        <div className="add-team-detail">
          <div className="team-detail">
            <p>
              This project is about the influence the design of everyday objects
              and art had have over the main historic moments of the world. With
              this course you’ll have a big complete understanding of main
              social design needs and the technical approach to solve them.
              {' '}
            </p>
          </div>
          <div className="team-edit-detail">
            <img
              className="editimage-tag"
              src={EditDetailImage}
              alt="EditDetailImage"
            />
          </div>
        </div>
        <div className="flex-button-top">
          <div className="team-controller">
            <div className="search-and-filters">
              <div className="search-bar">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search project"
                />
                <img src={searchimg} alt="search" />
              </div>
            </div>
            <div className="team-project-btns">
              <Buttons
                text="Open White Board"
                secondary
                width="168px"
                height="32px"
                className="mr-16"
                hover
              />
              <Buttons
                icon={faPlus}
                text="Add project"
                primary
                width="128px"
                height="32px"
                hover
                onClick={() => {
                  // setPageLoad((oldStatus) => !oldStatus);
                  history.push(`/org/${organization?.domain}/teams/${team?.id}/add-projects`);
                }}
              />
            </div>
          </div>
        </div>
        <div className="team-cards">
          <div className="row">
            <div className="col-md-12">
              <div className="check-home">
                {team?.projects?.map((project) => (
                  <div className="playlist-resource" key={project.id}>
                    <ProjectCard
                      project={project}
                      showDeletePopup={showDeletePopup}
                      handleShow={handleShow}
                      setProjectId={setProjectId}
                      setCreateProject={setCreateProject}
                      seteditMode={seteditMode}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${toggleLeft ? 'width10' : ''} right`}>
        <button
          type="button"
          className="toggle_btn"
          onClick={() => setToggleLeft(!toggleLeft)}
        >
          <img src={Right} alt="chevron-right" className={`${toggleLeft ? 'image_rotate' : ''}`} />
        </button>
        <div className="right_head">
          <h1 className={`${toggleLeft ? 'none' : ''}`}>Team members </h1>
          <img src={UserIcon} alt="" />
        </div>
        <div className="right_select">
          <select className={`${toggleLeft ? 'none' : ''}`}>
            <option>Invite a team member</option>
          </select>
        </div>
        {team?.users?.map((user) => (
          <div className="right_card">
            <div className="right_info">
              <div>
                <div className="member-name-mark">
                  <span>{`${user?.first_name ? user?.first_name[0] : ''}${user?.last_name ? user?.last_name[0] : ''}`}</span>
                </div>
              </div>
              <div className={`${toggleLeft ? 'none' : ''}`}>
                <h6>{`${user?.first_name} ${user?.last_name}`}</h6>
                <p>{user?.email}</p>
              </div>
            </div>
            <div className={`${toggleLeft ? 'none' : ''} right_label`}>
              <span>{user?.role?.name}</span>
              <img src={Deleticon} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

TeamDetail.propTypes = {
  team: PropTypes.object.isRequired,
  organization: PropTypes.string.isRequired,
};

export default TeamDetail;

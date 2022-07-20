import React, { useState } from 'react';
import Buttons from 'utils/Buttons/buttons';
import TopHeading from 'utils/TopHeading/topheading';
import { faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import projectFolder from 'assets/images/svg/projectFolder.svg';
import './style.scss';

import PlayListImage from 'assets/images/svg/playlist1.svg';
import HeadingThree from 'utils/HeadingThree/headingthree';
import ProjectList from 'utils/ProjectList/projectlist';
// import Footer from "components/Footer";

const ProjectDetailList = () => {
  const playList1 = [
    { title: 'Activity #1' },
    { title: 'Activity #2' },
    { title: 'My first activity', status: 'Shared' },
  ];
  const playList2 = [
    { title: 'Activity #1' },
    { title: 'Activity #2' },
    { title: 'My first activity', status: 'Shared' },
    { title: 'Activity #2' },
    { title: 'Activity #2', status: 'Shared' },
  ];

  const [openMyProject, setOpenMyProject] = useState(false);
  const [uploadImageStatus, setUploadImageStatus] = useState(false);
  return (
    <>
      <div className="myproject-playlist">
        <div className="content-wrapper">
          <div className="inner-content">
            <div className="topHeading-playlist-detail">
              <div className="topHeading-creation-btn">
                <div>
                  <TopHeading
                    description="Nevada Department of Education"
                    image={projectFolder}
                    heading="Design, Art & History"
                    color="#084892"
                    className="heading-style"
                  />
                </div>
                <div className="playlist-creation-btn">
                  <Buttons
                    secondary
                    text="Create new playlist"
                    icon={faPlus}
                    width="189px"
                    height="35px"
                    hover
                    className="btn-margin"
                  />
                  <Buttons
                    primary
                    text="Project Preview"
                    icon={faEye}
                    width="162px"
                    height="35px"
                    hover
                  />
                </div>
              </div>
            </div>
            <div className="topHeading-playlist-project-title">
              <HeadingThree text="Project name" color="#084892" />
            </div>
            <div className="project-playlist-card">
              <div className="playlist-card">
                <ProjectList
                  projectTitle="Playlist name #2"
                  playList={playList1}
                />
              </div>
              <div className="playlist-card">
                <ProjectList
                  projectTitle="Playlist name #3"
                  playList={playList2}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailList;

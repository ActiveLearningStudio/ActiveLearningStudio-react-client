/*eslint-disable*/
import React, { useState } from 'react';
import Buttons from 'utils/Buttons/buttons';
import TopHeading from 'utils/TopHeading/topheading';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import projectFolder from 'assets/images/svg/myProject.svg';
import './style.scss';
import HeadingThree from 'utils/HeadingThree/headingthree';
import HeadingText from 'utils/HeadingText/headingtext';
import PlaylistCard from 'containers/Playlists/PlaylistCard';
import ProjectPlayListCard from 'utils/ProjectPlayListCard/projectplaylistcard';
import PlayListImage from 'assets/images/svg/playlist1.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyProjectsCreate from './formik/createproject';
import MyProjectCard from 'utils/MyProjectCard/myprojectcard';
import ProjectCard1 from 'assets/images/myproject1.png';
import ProjectCard2 from 'assets/images/myproject2.png';
import ProjectCard3 from 'assets/images/myproject3.png';
// import Footer from "components/Footer";
const MyProjectMain = () => {
  const playList1 = [
    { img: PlayListImage, title: 'Guess the Answer' },
    { img: PlayListImage, title: 'Summary' },
    { img: PlayListImage, title: 'Guess the Answer' },
    { img: PlayListImage, title: 'Summary' },
  ];

  const playList2 = [
    { img: PlayListImage, title: 'Guess the Answer' },
    { img: PlayListImage, title: 'Summary' },
  ];

  const [openMyProject, setOpenMyProject] = useState(false);
  const [uploadImageStatus, setUploadImageStatus] = useState(false);
  return (
    <>
      {openMyProject && (
        <div className={uploadImageStatus ? 'form-new-popup-myproject z-index' : 'form-new-popup-myproject'}>
          <FontAwesomeIcon icon="times" className="cross-all-pop" onClick={() => setOpenMyProject(!openMyProject)} />
          <div className="inner-form-content">
            <MyProjectsCreate setUploadImageStatus={setUploadImageStatus} />
          </div>
        </div>
      )}
      <div className="myprojectmain">
        <div className="content-wrapper">
          <div className="inner-content">
            <div className="topHeading-prject-detail">
              <div className="topHeading">
                <TopHeading description="Nevada Department of Education" image={projectFolder} heading="My Projects" color="#084892" />
                <Buttons primary={true} text="Create a project" icon={faPlus} width="163px" height="35px" onClick={() => setOpenMyProject(!openMyProject)} hover={true} />
              </div>
              <div className="top-project-detail">
                {/* <div className="project-title-btn">
                  <HeadingThree text="Projects" color="#084892" />
                  <Buttons
                    primary={true}
                    text="Create a project"
                    icon={faPlus}
                    width="163px"
                    height="35px"
                    onClick={() => setOpenMyProject(!openMyProject)}
                    hover={true}
                  />
                </div> */}
                <div className="project-detail">
                  <HeadingText
                    text="This is the instrcutional text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    color="#515151"
                  />
                </div>
              </div>
            </div>
            <div className="top-project-detail-btn-tabs">
              <Buttons
                primary={true}
                text="My Projects"
                width="163px"
                height="35px"
                // onClick={() => setOpenMyProject(!openMyProject)}
                hover={true}
                className="btn-tabs"
              />
              <Buttons
                secondary={true}
                text="Sample Projects"
                width="163px"
                height="35px"
                // onClick={() => setOpenMyProject(!openMyProject)}
                hover={true}
                className="btn-tabs"
              />
              <Buttons
                secondary={true}
                text="Favorite Projects"
                width="163px"
                height="35px"
                // onClick={() => setOpenMyProject(!openMyProject)}
                hover={true}
                className="btn-tabs"
              />
              <Buttons
                secondary={true}
                text="My Team Projects"
                width="163px"
                height="35px"
                // onClick={() => setOpenMyProject(!openMyProject)}
                hover={true}
                className="btn-tabs"
              />
            </div>
            <div className="project-playlist-card">
              <div className="playlist-card">
                <MyProjectCard backgroundImg={ProjectCard1} title="Design, Art & History" />
              </div>
              <div className="playlist-card">
                <MyProjectCard backgroundImg={ProjectCard2} title="Project name #2" />
              </div>
              <div className="playlist-card">
                <MyProjectCard backgroundImg={ProjectCard3} title="Project name #3" />
              </div>
              {/* <div className="playlist-card">
                <ProjectPlayListCard
                  playList={playList1}
                  title="Project name #2"
                  backgroundImg={PlayCardImage}
                />
              </div>
              <div className="playlist-card">
                <ProjectPlayListCard
                  playList={playList2}
                  title="Art Course"
                  backgroundImg={PlayCardImage}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProjectMain;

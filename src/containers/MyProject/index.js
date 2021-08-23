/*eslint-disable*/
import React from "react";
import Buttons from "utils/Buttons/buttons";
import TopHeading from "utils/TopHeading/topheading";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import projectFolder from "assets/images/svg/projectFolder.svg";
import "./style.scss";
import HeadingThree from "utils/HeadingThree/headingthree";
import HeadingText from "utils/HeadingText/headingtext";
import PlaylistCard from "containers/Playlists/PlaylistCard";
import ProjectPlayListCard from "utils/ProjectPlayListCard/projectplaylistcard";
import PlayListImage from "assets/images/svg/playlist1.svg";

const MyProjectMain = () => {
  const playList1 = [
    { img: PlayListImage, title: "Guess the Answer" },
    { img: PlayListImage, title: "Summary" },
    { img: PlayListImage, title: "Guess the Answer" },
    { img: PlayListImage, title: "Summary" },
  ];

  const playList2 = [
    { img: PlayListImage, title: "Guess the Answer" },
    { img: PlayListImage, title: "Summary" },
  ];
  return (
    <div className="myprojectmain">
      <div className="content-wrapper">
        <div className="inner-content">
          <div className="topHeading-prject-detail">
            <div className="topHeading">
              <TopHeading
                description="Organization"
                image={projectFolder}
                heading="My Projects"
                color="#084892"
              />
            </div>
            <div className="top-project-detail">
              <div className="project-title-btn">
                <HeadingThree text="Projects" color="#084892" />
                <Buttons
                  primary={true}
                  text="Create a project"
                  icon={faPlus}
                  width="163px"
                  height="35px"
                  // onClick={() => changeScreenHandler("newactivity")}
                  hover={true}
                />
              </div>
              <div className="project-detail">
                <HeadingText
                  text="This is the instrcutional text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  color="#515151"
                />
              </div>
            </div>
          </div>
          <div className="project-playlist-card">
            <div className="playlist-card">
              <ProjectPlayListCard playList={playList1} />
            </div>
            <div className="playlist-card">
              <ProjectPlayListCard playList={playList2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProjectMain;

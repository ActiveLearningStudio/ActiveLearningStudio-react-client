/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import foldericon from "assets/images/svg/projectFolder.svg";
import { useSelector } from "react-redux";
import { setCurrentVisibilityType } from "store/actions/project";
import Headings from "curriki-design-system/dist/utils/Headings/headings";
import Buttons from "utils/Buttons/buttons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchForm from "components/Header/searchForm";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";

export default function Headline({ setCreateProject }) {
  const organization = useSelector((state) => state.organization);
  const { currentOrganization, permission } = organization;
  const primaryColor = getGlobalColor("--main-primary-color");
  return (
    <>
      <div className="project-headline">
        <div className="title">
          <div className="title-name-heading-image">
            <Headings
              text={`${currentOrganization?.name}`}
              headingType="body2"
              color="#084892"
            />
            <div className="heading-image">
              {/* <img src={foldericon} alt="" /> */}
              <svg
                width="35"
                height="35"
                viewBox="0 0 30 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M4 9.60938V24.6094C4 25.2998 4.55965 25.8594 5.25 25.8594H25.25C25.9404 25.8594 26.5 25.2998 26.5 24.6094V11.3402C26.5 10.6498 25.9404 10.0902 25.25 10.0902H16.4038"
                    stroke={primaryColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16.4038 10.0902L12.933 6.04244C12.8159 5.92523 12.6569 5.85938 12.4911 5.85938H4.625C4.27983 5.85938 4 6.1392 4 6.48437V9.60937"
                    stroke={primaryColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect
                      width="30"
                      height="30"
                      fill="white"
                      transform="translate(0 0.859375)"
                    />
                  </clipPath>
                </defs>
              </svg>

              {/* Projects */}
              <Headings text="My Projects" headingType="h2" color="#084892" />
            </div>
          </div>
          <div className="search-main-relaced">
            <div className="search-div">
              <SearchForm />
            </div>
            {/* {permission?.Project?.includes('project:create') && (
              <Buttons
                primary
                text="Create a project"
                icon={faPlus}
                iconColor="#FF0000"
                width="auto"
                height="35px"
                onClick={() => {
                  setCurrentVisibilityType(null);
                  setCreateProject(true);
                }}
                hover
              />
            )} */}
          </div>
        </div>
        <Headings
          text="Create and organize your activities into projects to create complete courses."
          headingType="body2"
          color="#515151"
          className="top-heading-detail"
        />
      </div>
    </>
  );
}

Headline.propTypes = {
  setCreateProject: PropTypes.func.isRequired,
};

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
import MyProjectLgSvg from "iconLibrary/mainContainer/MyProjectLgSvg";
import C2ELogo from "../../assets/images/c2e-logo.svg";

export default function Headline() {
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
              <img src={C2ELogo} alt="C2ELogo" />
              <Headings
                text="My C2E"
                headingType="h2"
                color="#084892"
              />
            </div>
          </div>
          <div className="search-main-relaced">
            <div className="search-div">{/* <SearchForm /> */}</div>
          </div>
        </div>
        <Headings
          text="Create and organize your C2E’s "
          headingType="body2"
          color="#515151"
          className="top-heading-detail"
        />
      </div>
    </>
  );
}

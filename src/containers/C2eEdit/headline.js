/* eslint-disable */
import React from "react";
import { useSelector } from "react-redux";
import Headings from "curriki-design-system/dist/utils/Headings/headings";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import EditDpDnMdSvg from "iconLibrary/dropDown/EditDpDnMdSvg";
import Buttons from "utils/Buttons/buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Headline({ setCreateProject }) {
  const organization = useSelector((state) => state.organization);
  const { currentOrganization, permission } = organization;
  const primaryColor = getGlobalColor("--main-primary-color");
  return (
    <>
      <div className="project-headline">
        <div className="title">
          <div className="title-name-heading-image w-100">
            <Headings
              // text={`${currentOrganization?.name}`}
              text="C2E Builder"
              headingType="body2"
              color="#084892"
            />
            <div className="w-100 d-flex align-items-center justify-content-between">
              <div className="heading-image align-items-center ">
                <Headings
                  text="C2E Title #1 "
                  headingType="h2"
                  color="#084892"
                />
                <div className="ml-3">
                  <EditDpDnMdSvg
                    primaryColor={primaryColor}
                    className="menue-img"
                  />
                </div>
              </div>
              <div className="d-flex align-items-center">
                <Buttons
                  text="C2E Configuration"
                  primary={true}
                  width="auto"
                  height="32px"
                  onClick={() => {
                    setCreateProject(true);
                  }}
                  hover={true}
                  className=""
                  icon="fa-gear"
                />
                <Buttons
                  text="Add Resources"
                  primary={true}
                  width="auto"
                  height="32px"
                  onClick={() => {}}
                  hover={true}
                  className="mx-2"
                  icon="fa-gear"
                />
                <Buttons
                  text="Save"
                  width="auto"
                  height="32px"
                  onClick={() => {}}
                  hover={true}
                  className=" bg-success"
                  icon="save"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

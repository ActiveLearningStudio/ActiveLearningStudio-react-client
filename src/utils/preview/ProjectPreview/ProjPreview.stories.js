/* eslint-disable */
import React from "react";
import PreviewStore from "!!raw-loader!../../../store/actions/ui";
import ProjPreviewimg from "./projPreview.png";
import { ProjPreview } from "./ProjPreview";
import previewShared from "./previewShared.png";
import PreviewSnippet from "!!raw-loader!../../../containers/Preview/ProjectPreview/index";
import SharedSnippet from "!!raw-loader!../../../containers/Preview/ProjectPreview/ProjectPreviewShared";
import SharedStore from "!!raw-loader!../../../store/actions/resource";
import PreviewStyle from "!!raw-loader!../../../containers/Preview/ProjectPreview/style.scss";
export default {
  title: "Preview/ProjectPreview",
  component: ProjPreview,
  argTypes: {
    backgroundddddd: { control: "ddddd" },
  },
};

const Template = (args) => <ProjPreview {...args} />;

export const index = Template.bind({});

index.args = {
  componentName: "Index",
  path: "/src/containers/Preview/ProjectPreview/index.js",
  description:
    "In this component, you can see the preview of the project." +
    "The project title will show at the top and some other links related to the project are" +
    " also shown on the right side top corner where you can view the shared link and exit preview mode." +
    "After this, you will also see the playlist and activities related to that playlist in the list form." +
    "Every playlist is shown in accordion, when you click on accordion then you will be able to see" +
    " activities related to that playlist in the given project.",
  codeSnippet: PreviewSnippet,
  libraryUsed: [
    "react-redux",
    "react-fontawesome",
    "react-router-dom",
    "prop-types",
    "Swal",
    "react-slick",
  ],
  customHooks: [
    {
      name: "/src/components/DeletePopup/index",
      url: "?path=/story/component-deletepopup-index--component",
    },
    {
      name: "/src/components/models/GoogleLoginModal",
      url: "?path=/story/component-modals-googleloginmodal--component",
    },
    {
      name: "/src/components/ActivityCard/index",
      url: "?path=/story/component-activitycard--component",
    },
    { name: "/src/components/SharePreviewPopup/index", url: "" },
  ],
  reduxStore: [{ path: "/src/store/actions/ui", pathCode: PreviewStore }],
  apiUsed: [],
  //customHooks={['./formik/createOrg','removeActiveAdminForm']}
  images: ProjPreviewimg,
  stylesheetUsed: PreviewStyle,
  example:
    "https://dev.currikistudio.org/org/currikistudio/project/5939/preview",
};

export const ProjectPreviewShared = Template.bind({});

ProjectPreviewShared.args = {
  componentName: "ProjectPreviewShared",
  path: "/src/containers/Preview/ProjectPreview/ProjectPreviewShared.js",
  description:
    "In this component, you can see the preview of the shared project." +
    "At the top, you will see the project title and project description." +
    "After this, you will see the playlist and activities related to that playlist in the list form. " +
    "Every playlist is shown in accordion, when you click on accordion then you will be able to see " +
    "activities related to that playlist in the given project.",
  codeSnippet: SharedSnippet,
  libraryUsed: [
    "react-redux",
    "react-bootstrap",
    "react-fontawesome",
    "react-router-dom",
    "prop-types",
    "react-slick",
  ],
  customHooks: [
    {
      name: "/src/components/ActivityCard/index",
      url: "?path=/story/component-activitycard--component",
    },
    { name: "/src/components/Unauthorized", url: "" },
  ],
  reduxStore: [{ path: "/src/store/actions/project", pathCode: SharedStore }],
  apiUsed: [],
  //customHooks={['./formik/createOrg','removeActiveAdminForm']}
  images: previewShared,
  stylesheetUsed: PreviewStyle,
  example: "https://dev.currikistudio.org/project/56/shared",
};

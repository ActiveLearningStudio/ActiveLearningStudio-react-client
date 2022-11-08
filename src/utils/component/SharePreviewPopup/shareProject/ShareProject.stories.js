/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";

import { ShareProject } from "./ShareProject.js";

export default {
  title: "Component/SharePreviewPopup/ShareProject",
  component: ShareProject,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <ShareProject />;

export const component = Template.bind({});

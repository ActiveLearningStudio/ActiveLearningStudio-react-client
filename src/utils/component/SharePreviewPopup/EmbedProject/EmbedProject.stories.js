/* eslint-disable */
import React from "react";
import { EmbedProject } from "./EmbedProject.js";
export default {
  title: "Component/SharePreviewPopup/EmbedProject",
  component: EmbedProject,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <EmbedProject />;

export const component = Template.bind({});

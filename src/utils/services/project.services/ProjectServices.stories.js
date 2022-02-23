/* eslint-disable */
import React from "react";
import { ProjectServices } from "./ProjectServices.js";
export default {
  title: "Services/ProjectServices",
  component: ProjectServices,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <ProjectServices />;

export const component = Template.bind({});

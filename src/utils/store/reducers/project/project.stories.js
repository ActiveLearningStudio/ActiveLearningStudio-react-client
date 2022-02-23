/* eslint-disable */
import React from "react";
import { Project } from "./project.js";
export default {
  title: "Store/Reducers/Project",
  component: Project,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Project />;

export const component = Template.bind({});

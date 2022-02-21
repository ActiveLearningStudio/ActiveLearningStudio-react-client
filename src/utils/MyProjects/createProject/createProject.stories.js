/* eslint-disable */
import React from "react";
import { CreateProject } from "./createProject.js";

export default {
  title: "My Projects/CreateProjectPopup",
  component: CreateProject,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <CreateProject />;

export const index = Template.bind({});

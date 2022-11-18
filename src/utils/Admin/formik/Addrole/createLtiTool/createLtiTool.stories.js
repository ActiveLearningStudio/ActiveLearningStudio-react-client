/* eslint-disable */
import React from "react";
import { CreateLtiTool } from "./createLtiTool.js";
export default {
  title: "Admin/formik/CreateLtiTool",
  component: CreateLtiTool,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <CreateLtiTool />;

export const component = Template.bind({});

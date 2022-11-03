/* eslint-disable */
import React from "react";
import { CreateEducationLevel } from "./createEducationLevel.js";
export default {
  title: "Admin/formik/CreateEducationLevel",
  component: CreateEducationLevel,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <CreateEducationLevel />;

export const component = Template.bind({});

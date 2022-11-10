/* eslint-disable */
import React from "react";
import { CreateAuthorTag } from "./createAuthorTag.js";
export default {
  title: "Admin/formik/CreateAuthorTag",
  component: CreateAuthorTag,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <CreateAuthorTag />;

export const component = Template.bind({});

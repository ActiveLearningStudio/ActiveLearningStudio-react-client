/* eslint-disable */
import React from "react";
import { CreateDefaultSso } from "./createDefaultSso.js";
export default {
  title: "Admin/formik/CreateDefaultSso",
  component: CreateDefaultSso,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <CreateDefaultSso />;

export const component = Template.bind({});

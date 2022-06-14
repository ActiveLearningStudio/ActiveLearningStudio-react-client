/* eslint-disable */
import React from "react";
import { CreateSubject } from "./createSubject.js";
export default {
  title: "Admin/formik/CreateSubject",
  component: CreateSubject,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <CreateSubject />;

export const component = Template.bind({});

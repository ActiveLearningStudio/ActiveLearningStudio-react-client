/* eslint-disable */
import React from "react";
import { CreateLms } from "./CreateLms.js";
export default {
  title: "Admin/formik/CreateLms",
  component: CreateLms,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <CreateLms />;

export const component = Template.bind({});

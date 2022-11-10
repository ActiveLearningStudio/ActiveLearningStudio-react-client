/* eslint-disable */
import React from "react";
import { CreateActivity } from "./CreateActivity.js";
export default {
  title: "Admin/formik/CreateActivity",
  component: CreateActivity,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <CreateActivity />;

export const component = Template.bind({});

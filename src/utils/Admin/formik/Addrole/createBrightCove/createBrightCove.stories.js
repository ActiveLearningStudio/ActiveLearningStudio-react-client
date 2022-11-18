/* eslint-disable */
import React from "react";
import { CreateBrightCove } from "./createBrightCove.js";
export default {
  title: "Admin/formik/CreateBrightCove",
  component: CreateBrightCove,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <CreateBrightCove />;

export const component = Template.bind({});

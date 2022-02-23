/* eslint-disable */
import React from "react";
import { Admin } from "./admin.js";
export default {
  title: "Store/Actions/Admin",
  component: Admin,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Admin />;

export const component = Template.bind({});

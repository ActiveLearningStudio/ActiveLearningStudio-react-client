/* eslint-disable */
import React from "react";
import { Dashboard } from "./dashboard.js";
export default {
  title: "Store/Actions/Dashboard",
  component: Dashboard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Dashboard />;

export const component = Template.bind({});

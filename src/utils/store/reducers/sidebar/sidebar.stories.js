/* eslint-disable */
import React from "react";
import { Sidebar } from "./sidebar.js";
export default {
  title: "Store/Reducers/Sidebar",
  component: Sidebar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Sidebar />;

export const component = Template.bind({});

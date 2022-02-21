/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";

import { Sidebar } from "./sidebar.js";

export default {
  title: "component/Sidebar/Index",
  component: Sidebar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Sidebar />;

export const component = Template.bind({});

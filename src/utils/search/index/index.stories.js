/* eslint-disable */
import React from "react";
import { Index } from "./index.js";
export default {
  title: "Search/Index",
  component: Index,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Index />;

export const component = Template.bind({});

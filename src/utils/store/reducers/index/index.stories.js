/* eslint-disable */
import React from "react";
import { Index } from "./index";
export default {
  title: "Store/Reducers/Index",
  component: Index,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Index />;

export const component = Template.bind({});

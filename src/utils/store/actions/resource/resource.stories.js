/* eslint-disable */
import React from "react";
import { Resource } from "./resource.js";
export default {
  title: "Store/Actions/Resource",
  component: Resource,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Resource />;

export const component = Template.bind({});

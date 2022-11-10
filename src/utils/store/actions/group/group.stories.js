/* eslint-disable */
import React from "react";
import { Group } from "./group.js";
export default {
  title: "Store/Actions/Group",
  component: Group,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Group />;

export const component = Template.bind({});

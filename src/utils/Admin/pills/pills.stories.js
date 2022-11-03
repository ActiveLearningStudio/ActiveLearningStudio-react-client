/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";

import { Pills } from "./pills.js";

export default {
  title: "Admin/pills",
  component: Pills,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Pills />;

export const component = Template.bind({});

/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";

import { Tables } from "./tables.js";

export default {
  title: "Admin/Tables",
  component: Tables,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Tables />;

export const component = Template.bind({});

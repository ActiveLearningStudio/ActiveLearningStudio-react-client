/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";

import { Starter } from "./starter.js";

export default {
  title: "Admin/Starter",
  component: Starter,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Starter />;

export const component = Template.bind({});

/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";

import { Register } from "./register.js";

export default {
  title: "Auth/RegisterPage",
  component: Register,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Register />;

export const component = Template.bind({});

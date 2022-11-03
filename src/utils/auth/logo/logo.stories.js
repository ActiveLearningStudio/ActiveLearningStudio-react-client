/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";
import { Logo } from "./logo.js";

export default {
  title: "Auth/Logo",
  component: Logo,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Logo />;

export const component = Template.bind({});

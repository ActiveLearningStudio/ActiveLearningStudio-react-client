/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";

import { Login } from "./login.js";

export default {
  title: "Auth/LoginPage",
  component: Login,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Login />;

export const component = Template.bind({});

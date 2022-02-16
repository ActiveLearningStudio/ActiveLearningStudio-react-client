/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";

import { ChangePassword } from "./ChangePassword.js";

export default {
  title: "Profile/ChangePasswordPage",
  component: ChangePassword,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <ChangePassword />;

export const component = Template.bind({});

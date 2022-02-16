/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";

import { UserRole } from "./userRole.js";

export default {
  title: "Admin/UserRole",
  component: UserRole,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <UserRole />;

export const component = Template.bind({});

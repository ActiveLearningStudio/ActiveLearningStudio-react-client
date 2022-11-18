/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";

import { Notification } from "./notification.js";

export default {
  title: "component/Header/notification",
  component: Notification,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Notification />;

export const component = Template.bind({});

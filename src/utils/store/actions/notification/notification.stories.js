/* eslint-disable */
import React from "react";
import { Notification } from "./notification.js";
export default {
  title: "Store/Actions/Notification",
  component: Notification,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Notification />;

export const component = Template.bind({});

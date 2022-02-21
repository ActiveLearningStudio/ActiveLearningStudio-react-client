/* eslint-disable */
import React from "react";
import { NotiArea } from "./notiArea.js";

export default {
  title: "Notification/NotificationArea",
  component: NotiArea,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <NotiArea />;

export const component = Template.bind({});

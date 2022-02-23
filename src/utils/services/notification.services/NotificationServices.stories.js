/* eslint-disable */
import React from "react";
import { NotificationServices } from "./NotificationServices.js";
export default {
  title: "Services/NotificationServices",
  component: NotificationServices,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <NotificationServices />;

export const component = Template.bind({});

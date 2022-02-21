/* eslint-disable */
import React from "react";
import { ActivityOption } from "./ActivityOption.js";
export default {
  title: "Component/Modals/ActivityOptions",
  component: ActivityOption,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <ActivityOption />;

export const component = Template.bind({});

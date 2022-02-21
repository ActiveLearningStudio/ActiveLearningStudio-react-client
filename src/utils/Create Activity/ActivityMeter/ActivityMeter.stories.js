/* eslint-disable */
import React from "react";
import { ActivityMeter } from "./ActivityMeter.js";

export default {
  title: "Create Activity/ActivityMeter",
  component: ActivityMeter,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <ActivityMeter />;

export const component = Template.bind({});

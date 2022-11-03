/* eslint-disable */
import React from "react";
import { Metrics } from "./metrics.js";
export default {
  title: "Store/Reducers/Metrics",
  component: Metrics,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Metrics />;

export const component = Template.bind({});

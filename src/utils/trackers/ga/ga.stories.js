/* eslint-disable */
import React from "react";
import { Ga } from "./ga.js";
export default {
  title: "Trackers/Ga",
  component: Ga,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Ga />;

export const component = Template.bind({});

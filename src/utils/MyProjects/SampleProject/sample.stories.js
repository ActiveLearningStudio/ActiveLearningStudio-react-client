/* eslint-disable */
import React from "react";
import { Sample } from "./sample.js";

export default {
  title: "My Projects/SampleProject",
  component: Sample,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Sample />;

export const component = Template.bind({});

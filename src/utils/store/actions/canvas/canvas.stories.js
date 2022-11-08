/* eslint-disable */
import React from "react";
import { Canvas } from "./canvas.js";
export default {
  title: "Store/Actions/Canvas",
  component: Canvas,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Canvas />;

export const component = Template.bind({});

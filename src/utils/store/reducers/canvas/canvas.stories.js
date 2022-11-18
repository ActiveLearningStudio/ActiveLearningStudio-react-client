/* eslint-disable */
import React from "react";
import { Canvas } from "./canvas.js";
export default {
  title: "Store/Reducers/Canvas",
  component: Canvas,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Canvas />;

export const component = Template.bind({});

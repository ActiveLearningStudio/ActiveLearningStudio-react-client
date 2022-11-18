/* eslint-disable */
import React from "react";
import { CanvaServices } from "./CanvaServices.js";
export default {
  title: "Services/CanvaServices",
  component: CanvaServices,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <CanvaServices />;

export const component = Template.bind({});

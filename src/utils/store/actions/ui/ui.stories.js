/* eslint-disable */
import React from "react";
import { Ui } from "./ui.js";
export default {
  title: "Store/Actions/Ui",
  component: Ui,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Ui />;

export const component = Template.bind({});

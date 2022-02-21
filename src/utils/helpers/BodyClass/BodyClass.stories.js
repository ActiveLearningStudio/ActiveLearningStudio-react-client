/* eslint-disable */
import React from "react";
import { BodyClass } from "./BodyClass.js";

export default {
  title: "helpers/BodyClass",
  component: BodyClass,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <BodyClass />;

export const component = Template.bind({});

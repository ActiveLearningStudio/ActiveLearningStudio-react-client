/* eslint-disable */
import React from "react";
import { Lms } from "./genericLMS";
export default {
  title: "Store/Actions/LMS/genericLMS",
  component: Lms,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Lms />;

export const component = Template.bind({});

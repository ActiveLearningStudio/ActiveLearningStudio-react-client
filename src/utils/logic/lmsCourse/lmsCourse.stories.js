/* eslint-disable */
import React from "react";
import { LmsCourse } from "./lmsCourse.js";

export default {
  title: "Logic/LmsCourse",
  component: LmsCourse,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <LmsCourse />;

export const component = Template.bind({});

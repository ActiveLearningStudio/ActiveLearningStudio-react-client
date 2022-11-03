/* eslint-disable */
import React from "react";
import { Error } from "./error.js";
export default {
  title: "Services/Error",
  component: Error,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Error />;

export const component = Template.bind({});

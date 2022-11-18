/* eslint-disable */
import React from "react";
import { AuthServices } from "./authServices.js";
export default {
  title: "Services/AuthServices",
  component: AuthServices,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <AuthServices />;

export const component = Template.bind({});

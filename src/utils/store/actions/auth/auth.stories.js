/* eslint-disable */
import React from "react";
import { Auth } from "./auth.js";
export default {
  title: "Store/Actions/Auth",
  component: Auth,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Auth />;

export const component = Template.bind({});

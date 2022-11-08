/* eslint-disable */
import React from "react";
import { OpenRoute } from "./OpenRoute.js";
export default {
  title: "Routers/OpenRoute",
  component: OpenRoute,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <OpenRoute />;

export const component = Template.bind({});

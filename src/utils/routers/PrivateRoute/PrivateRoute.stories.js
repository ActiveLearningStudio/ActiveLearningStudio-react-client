/* eslint-disable */
import React from "react";
import { PrivateRoute } from "./PrivateRoute.js";
export default {
  title: "Routers/PrivateRoute",
  component: PrivateRoute,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <PrivateRoute />;

export const component = Template.bind({});

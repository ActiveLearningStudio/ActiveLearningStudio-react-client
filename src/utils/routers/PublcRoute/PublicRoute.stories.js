/* eslint-disable */
import React from "react";
import { PublicRoute } from "./PublicRoute.js";
export default {
  title: "Routers/PublicRoute",
  component: PublicRoute,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <PublicRoute />;

export const component = Template.bind({});

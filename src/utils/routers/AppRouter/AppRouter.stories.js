/* eslint-disable */
import React from "react";
import { AppRouter } from "./AppRouter.js";
export default {
  title: "Routers/AppRouter",
  component: AppRouter,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <AppRouter />;

export const component = Template.bind({});

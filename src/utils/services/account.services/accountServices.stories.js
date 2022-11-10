/* eslint-disable */
import React from "react";
import { AccountServices } from "./accountservices.js";
export default {
  title: "Services/AccountServices",
  component: AccountServices,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <AccountServices />;

export const component = Template.bind({});

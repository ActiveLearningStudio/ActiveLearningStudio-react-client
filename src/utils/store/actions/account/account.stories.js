/* eslint-disable */
import React from "react";
import { Account } from "./account.js";
export default {
  title: "Store/Actions/Account",
  component: Account,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Account />;

export const component = Template.bind({});

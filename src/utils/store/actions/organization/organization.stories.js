/* eslint-disable */
import React from "react";
import { Organization } from "./organization.js";
export default {
  title: "Store/Actions/Organization",
  component: Organization,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Organization />;

export const component = Template.bind({});

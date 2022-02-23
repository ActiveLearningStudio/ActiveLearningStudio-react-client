/* eslint-disable */
import React from "react";
import { AdminServices } from "./adminServices.js";
export default {
  title: "Services/AdminServices",
  component: AdminServices,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <AdminServices />;

export const component = Template.bind({});

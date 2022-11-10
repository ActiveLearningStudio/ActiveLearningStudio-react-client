/* eslint-disable */
import React from "react";
import { CreateOrg } from "./CreateOrg.js";
export default {
  title: "Admin/formik/CreateOrg",
  component: CreateOrg,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <CreateOrg />;

export const component = Template.bind({});

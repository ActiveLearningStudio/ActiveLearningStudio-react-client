/* eslint-disable */
import React from "react";
import { CreateActivityLayout } from "./createActivityLayout.js";
export default {
  title: "Admin/formik/CreateActivityLayout",
  component: CreateActivityLayout,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <CreateActivityLayout />;

export const component = Template.bind({});

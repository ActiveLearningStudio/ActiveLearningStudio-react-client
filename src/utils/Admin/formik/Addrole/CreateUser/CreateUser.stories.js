/* eslint-disable */
import React from "react";
import { CreateUser } from "./CreateUser.js";
export default {
  title: "Admin/formik/CreateUser",
  component: CreateUser,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <CreateUser />;

export const component = Template.bind({});

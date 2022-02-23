/* eslint-disable */
import React from "react";
import { Addrole } from "./addrole.js";
export default {
  title: "Admin/formik/addrole",
  component: Addrole,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Addrole />;

export const component = Template.bind({});

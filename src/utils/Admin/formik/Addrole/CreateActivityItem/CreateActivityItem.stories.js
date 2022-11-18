/* eslint-disable */
import React from "react";
import { CreateActivityItem } from "./CreateActivityItem.js";
export default {
  title: "Admin/formik/CreateActivityItem",
  component: CreateActivityItem,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <CreateActivityItem />;

export const component = Template.bind({});

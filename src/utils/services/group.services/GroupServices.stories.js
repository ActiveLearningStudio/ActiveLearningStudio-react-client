/* eslint-disable */
import React from "react";
import { GroupServices } from "./GroupServices.js";
export default {
  title: "Services/GroupServices",
  component: GroupServices,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <GroupServices />;

export const component = Template.bind({});

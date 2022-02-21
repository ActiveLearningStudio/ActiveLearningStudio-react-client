/* eslint-disable */
import React from "react";
import { SelectActivity } from "./SelectActivity.js";

export default {
  title: "Component/ResourceCard/AddResource/ResourceSelectActivity",
  component: SelectActivity,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <SelectActivity />;

export const component = Template.bind({});

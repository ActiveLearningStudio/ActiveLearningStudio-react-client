/* eslint-disable */
import React from "react";
import { SelectActivity } from "./EditSelectActivity.js";

export default {
  title: "Component/ResourceCard/EditResource/ResourceSelectActivity",
  component: SelectActivity,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <SelectActivity />;

export const component = Template.bind({});

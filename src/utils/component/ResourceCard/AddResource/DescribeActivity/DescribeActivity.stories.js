/* eslint-disable */
import React from "react";
import { DescribeActivity } from "./DescribeActivity.js";

export default {
  title: "Component/ResourceCard/AddResource/ResourceDescribeActivity",
  component: DescribeActivity,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <DescribeActivity />;

export const component = Template.bind({});

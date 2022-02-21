/* eslint-disable */
import React from "react";
import { DescribeActivity } from "./EditDescribeActivity.js";

export default {
  title: "Component/ResourceCard/EditResource/ResourceDescribeActivity",
  component: DescribeActivity,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <DescribeActivity />;

export const component = Template.bind({});

/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";

import { Myprofile } from "./myprofile.js";

export default {
  title: "component/Header/Myprofile",
  component: Myprofile,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Myprofile />;

export const component = Template.bind({});

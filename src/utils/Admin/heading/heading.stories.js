/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";

import { Heading } from "./heading.js";

export default {
  title: "Admin/Heading",
  component: Heading,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Heading />;

export const component = Template.bind({});

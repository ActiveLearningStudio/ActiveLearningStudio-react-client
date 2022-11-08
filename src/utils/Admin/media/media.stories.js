/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";

import { Media } from "./media.js";

export default {
  title: "Admin/Media",
  component: Media,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Media />;

export const component = Template.bind({});

/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";

import { Index } from "./index.js";

export default {
  title: "Component/ActivityPreviewCard",
  component: Index,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Index />;

export const component = Template.bind({});

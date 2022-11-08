/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";

import { Index } from "./Index.js";

export default {
  title: "Component/CompleteProfileAlert",
  component: Index,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Index />;

const component = Template.bind({});

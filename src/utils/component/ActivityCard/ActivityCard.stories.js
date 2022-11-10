/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";

import { ActivityCard } from "./ActivityCard.js";

export default {
  title: "Component/ActivityCard",
  component: ActivityCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <ActivityCard />;

export const component = Template.bind({});

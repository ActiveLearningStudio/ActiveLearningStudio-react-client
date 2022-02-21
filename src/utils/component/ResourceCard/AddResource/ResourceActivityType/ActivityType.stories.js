/* eslint-disable */
import React from "react";
import { ActivityType } from "./ActivityType.js";

export default {
  title: "Component/ResourceCard/AddResource/ResourceActivityType",
  component: ActivityType,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <ActivityType />;

export const component = Template.bind({});

/* eslint-disable */
import React from "react";
import { ActivityType } from "./EditActivityType.js";

export default {
  title: "Component/ResourceCard/EditResource/ResourceActivityType",
  component: ActivityType,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <ActivityType />;

export const component = Template.bind({});

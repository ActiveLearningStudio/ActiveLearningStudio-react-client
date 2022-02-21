/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";

import { ResourceSidbar } from "./ResourceSidebar.js";

export default {
  title: "Component/ResourceCard/AddResource/AddResourceSidebar",
  component: ResourceSidbar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <ResourceSidbar />;

export const component = Template.bind({});

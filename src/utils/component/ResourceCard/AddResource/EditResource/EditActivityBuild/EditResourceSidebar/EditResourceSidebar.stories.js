/* eslint-disable */
import React from "react";
import { ResourceSidbar } from "./EditResourceSidebar.js";

export default {
  title: "Component/ResourceCard/EditResource/EditResourceSidebar",
  component: ResourceSidbar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <ResourceSidbar />;

export const component = Template.bind({});

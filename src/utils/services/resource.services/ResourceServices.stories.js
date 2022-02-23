/* eslint-disable */
import React from "react";
import { ResourceServices } from "./ResourceServices.js";
export default {
  title: "Services/ResourceServices",
  component: ResourceServices,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <ResourceServices />;

export const component = Template.bind({});

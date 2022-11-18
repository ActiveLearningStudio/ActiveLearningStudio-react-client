/* eslint-disable */
import React from "react";
import { OrgServices } from "./orgServices.js";
export default {
  title: "Services/OrganizationServices",
  component: OrgServices,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <OrgServices />;

export const component = Template.bind({});

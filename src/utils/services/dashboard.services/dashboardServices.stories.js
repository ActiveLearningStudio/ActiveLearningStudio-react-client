/* eslint-disable */
import React from "react";
import { DashboardServices } from "./dashboardServices";
export default {
  title: "Services/DashboardServices",
  component: DashboardServices,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <DashboardServices />;

export const component = Template.bind({});

/* eslint-disable */
import React from "react";
import { TeamServices } from "./TeamServices.js";
export default {
  title: "Services/TeamServices",
  component: TeamServices,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <TeamServices />;

export const component = Template.bind({});

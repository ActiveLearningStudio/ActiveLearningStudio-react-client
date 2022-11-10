/* eslint-disable */
import React from "react";
import { Team } from "./team.js";
export default {
  title: "Store/Reducers/Team",
  component: Team,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Team />;

export const component = Template.bind({});

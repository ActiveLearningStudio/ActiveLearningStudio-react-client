/* eslint-disable */
import React from "react";
import { Headline } from "./headline.js";

export default {
  title: "My Projects/Headline",
  component: Headline,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Headline />;

export const component = Template.bind({});

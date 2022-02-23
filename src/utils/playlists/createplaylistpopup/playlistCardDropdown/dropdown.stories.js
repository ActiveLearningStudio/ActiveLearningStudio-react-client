/* eslint-disable */
import React from "react";
import { Dropdown } from "./dropdown.js";
export default {
  title: "PlayLists/Dropdown",
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Dropdown />;

export const compoenent = Template.bind({});

/* eslint-disable */
import React from "react";
import { Dropdown } from "./dropdown";

export default {
  title: "Component/ResourceCard/ResourceCardDropdown",
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Dropdown />;

export const component = Template.bind({});

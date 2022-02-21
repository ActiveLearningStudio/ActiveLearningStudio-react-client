/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";

import { Search } from "./search.js";

export default {
  title: "component/Header/Search Form",
  component: Search,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Search />;

export const component = Template.bind({});

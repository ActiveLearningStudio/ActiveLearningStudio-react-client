/* eslint-disable */
import React from "react";
import { Search } from "./search.js";
export default {
  title: "Store/Actions/Search",
  component: Search,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Search />;

export const component = Template.bind({});

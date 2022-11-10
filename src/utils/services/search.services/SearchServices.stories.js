/* eslint-disable */
import React from "react";
import { SearchServices } from "./SearchServices.js";
export default {
  title: "Services/SearchServices",
  component: SearchServices,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <SearchServices />;

export const component = Template.bind({});

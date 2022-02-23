/* eslint-disable */
import React from "react";
import { StorageServices } from "./StorageServices.js";
export default {
  title: "Services/StorageServices",
  component: StorageServices,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <StorageServices />;

export const component = Template.bind({});

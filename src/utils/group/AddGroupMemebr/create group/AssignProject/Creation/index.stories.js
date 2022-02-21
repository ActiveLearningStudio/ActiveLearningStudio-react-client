/* eslint-disable */
import React from "react";
import { Index } from "./index.js";

export default {
  title: "Groups/CreateGroup/Creation",
  component: Index,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Index />;

export const index = Template.bind({});

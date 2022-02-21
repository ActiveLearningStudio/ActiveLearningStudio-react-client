/* eslint-disable */
import React from "react";
import { Pexels } from "./pexels.js";

export default {
  title: "Component/Modals/Pexels",
  component: Pexels,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Pexels />;

export const component = Template.bind({});

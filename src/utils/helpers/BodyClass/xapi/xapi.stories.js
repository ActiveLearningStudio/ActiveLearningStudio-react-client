/* eslint-disable */
import React from "react";
import { Xapi } from "./xapi.js";

export default {
  title: "helpers/Xapi",
  component: Xapi,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Xapi />;

export const component = Template.bind({});

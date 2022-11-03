/* eslint-disable */
import React from "react";
import { Share } from "./share.js";
export default {
  title: "Store/Actions/Share",
  component: Share,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Share />;

export const component = Template.bind({});

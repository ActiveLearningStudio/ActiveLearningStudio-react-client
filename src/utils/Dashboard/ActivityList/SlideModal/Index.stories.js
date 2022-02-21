/* eslint-disable */
import React from "react";
import { Index } from "./Index.js";

export default {
  title: "Dashboard/SlideModal",
  component: Index,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Index />;

const component = Template.bind({});

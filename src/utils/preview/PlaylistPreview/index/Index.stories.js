/* eslint-disable */
import React from "react";
import { Index } from "./Index.js";
export default {
  title: "Preview/PlaylistPreview/Index",
  component: Index,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Index />;

export const component = Template.bind({});

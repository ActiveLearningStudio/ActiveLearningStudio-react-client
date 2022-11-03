/* eslint-disable */
import React from "react";
import { Index } from "./index.js";

export default {
  title: "PlayLists/PlaylistCard",
  component: Index,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Index />;

export const index = Template.bind({});

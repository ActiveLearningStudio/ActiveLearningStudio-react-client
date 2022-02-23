/* eslint-disable */
import React from "react";
import { Playlist } from "./playlist.js";
export default {
  title: "Store/Actions/Playlist",
  component: Playlist,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Playlist />;

export const component = Template.bind({});

/* eslint-disable */
import React from "react";
import { PlaylistServices } from "./PlaylistServices.js";
export default {
  title: "Services/PlaylistServices",
  component: PlaylistServices,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <PlaylistServices />;

export const component = Template.bind({});

/* eslint-disable */
import React from "react";
import { LtiPlaylist } from "./LtiPlaylist";
export default {
  title: "Preview/PlaylistPreview/LtiPlaylistPreview",
  component: LtiPlaylist,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <LtiPlaylist />;

export const component = Template.bind({});

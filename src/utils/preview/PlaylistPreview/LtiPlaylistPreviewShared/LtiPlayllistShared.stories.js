/* eslint-disable */
import React from "react";
import { LtiPlaylistShared } from "./LtiPlaylistShared";
export default {
  title: "Preview/PlaylistPreview/LtiPlaylistPreviewShared",
  component: LtiPlaylistShared,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <LtiPlaylistShared />;

export const component = Template.bind({});

/* eslint-disable */
import React from "react";
import { PreviousLink } from "./PreviousLink.js";
export default {
  title: "Preview/PlaylistPreview/Component/PreviousLink",
  component: PreviousLink,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <PreviousLink />;

export const component = Template.bind({});

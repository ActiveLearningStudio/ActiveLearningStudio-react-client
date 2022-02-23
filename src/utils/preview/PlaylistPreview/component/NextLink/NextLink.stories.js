/* eslint-disable */
import React from "react";
import { NextLink } from "./NextLink.js";

export default {
  title: "Preview/PlaylistPreview/Component/NextLink",
  component: NextLink,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <NextLink />;

export const component = Template.bind({});

/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";

import { PlaylistLoading } from "./PlaylistLoading.js";

export default {
  title: "Component/Loading/PlaylistLoading",
  component: PlaylistLoading,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <PlaylistLoading />;

const component = Template.bind({});

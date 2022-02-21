/* eslint-disable */
import React from "react";
import { ShareLink } from "./ShareLink";

export default {
  title: "Component/ResourceCard/ShareLink",
  component: ShareLink,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <ShareLink />;

export const component = Template.bind({});

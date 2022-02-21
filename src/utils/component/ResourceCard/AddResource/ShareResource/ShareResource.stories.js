/* eslint-disable */
import React from "react";
import { ShareResource } from "./ShareResource";

export default {
  title: "Component/ResourceCard/ShareResource",
  component: ShareResource,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <ShareResource />;

export const component = Template.bind({});

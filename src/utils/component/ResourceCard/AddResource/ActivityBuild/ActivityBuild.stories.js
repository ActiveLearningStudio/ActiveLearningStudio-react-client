/* eslint-disable */
import React from "react";
import { Activitybuild } from "./ActivityBuild";

export default {
  title: "Component/ResourceCard/AddResource/ResourceActivityBuild",
  component: Activitybuild,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Activitybuild />;

export const component = Template.bind({});

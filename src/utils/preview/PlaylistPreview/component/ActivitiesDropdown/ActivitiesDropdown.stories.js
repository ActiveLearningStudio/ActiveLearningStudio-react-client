/* eslint-disable */
import React from "react";
import { ActivitiesDropdown } from "./ActivitiesDropdown.js";
export default {
  title: "Preview/PlaylistPreview/Component/ActivitiesDropdown",
  component: ActivitiesDropdown,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <ActivitiesDropdown />;

export const component = Template.bind({});

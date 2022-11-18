/* eslint-disable */
import React from "react";
import { ActivitiesList } from "./ActivitiesList.js";
export default {
  title: "Preview/PlaylistPreview/Component/ActivitiesList",
  component: ActivitiesList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <ActivitiesList />;

export const component = Template.bind({});

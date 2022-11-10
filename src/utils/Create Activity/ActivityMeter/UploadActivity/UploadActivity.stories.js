/* eslint-disable */
import React from "react";
import { UploadActivity } from "./UploadActivity.js";

export default {
  title: "Create Activity/UploadActivity",
  component: UploadActivity,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <UploadActivity />;

export const component = Template.bind({});

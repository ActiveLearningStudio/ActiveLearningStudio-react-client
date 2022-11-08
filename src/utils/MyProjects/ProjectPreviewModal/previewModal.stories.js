/* eslint-disable */
import React from "react";
import { PreviewModal } from "./PreviewModal.js";

export default {
  title: "My Projects/SamplePreviewModal",
  component: PreviewModal,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <PreviewModal />;

export const component = Template.bind({});

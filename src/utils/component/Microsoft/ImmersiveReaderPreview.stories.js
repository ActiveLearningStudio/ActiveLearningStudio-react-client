/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";

import { ImmersiveReaderPreview } from "./ImmersiveReaderPreview.js";

export default {
  title: "Component/Microsoft/ImmersiveReaderPreview",
  component: ImmersiveReaderPreview,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <ImmersiveReaderPreview />;

const component = Template.bind({});

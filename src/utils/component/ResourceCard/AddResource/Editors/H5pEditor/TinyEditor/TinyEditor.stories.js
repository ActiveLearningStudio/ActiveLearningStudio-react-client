/* eslint-disable */
import React from "react";
import { TinyEditor } from "./TinyEditor.js";

export default {
  title: "Component/ResourceCard/AddResource/Editors/TinyEditor",
  component: TinyEditor,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <TinyEditor />;

export const component = Template.bind({});

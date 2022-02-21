/* eslint-disable */
import React from "react";
import { MetaTitleField } from "./MetaTitleField.js";

export default {
  title: "Component/ResourceCard/Field/MetaTitleInputField",
  component: MetaTitleField,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <MetaTitleField />;

export const component = Template.bind({});

/* eslint-disable */
import React from "react";
import { MetaEducationLevel } from "./MetaEducationLevel.js";

export default {
  title: "Component/ResourceCard/Field/MetaEducationLevelInputField",
  component: MetaEducationLevel,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <MetaEducationLevel />;

export const component = Template.bind({});

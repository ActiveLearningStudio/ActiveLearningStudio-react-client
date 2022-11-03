/* eslint-disable */
import React from "react";
import { MetaSubjectField } from "./MetaSubjectField.js";

export default {
  title: "Component/ResourceCard/Field/MetaSubjectField",
  component: MetaSubjectField,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <MetaSubjectField />;

export const component = Template.bind({});

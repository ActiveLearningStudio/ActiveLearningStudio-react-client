/* eslint-disable */
import React from "react";
import { GenericLms } from "./genericLms";
export default {
  title: "Store/GenericLMSActionTypes",
  component: GenericLms,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <GenericLms />;

export const component = Template.bind({});

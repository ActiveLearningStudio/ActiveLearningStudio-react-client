/* eslint-disable */
import React from "react";
import { GenericLmsServices } from "./genericLmsServices";
export default {
  title: "Services/GenericLmsServices",
  component: GenericLmsServices,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <GenericLmsServices />;

export const component = Template.bind({});

/* eslint-disable */
import React from "react";
import { GapiServices } from "./GapiServices";
export default {
  title: "Services/GapiServices",
  component: GapiServices,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <GapiServices />;

export const component = Template.bind({});

/* eslint-disable */
import React from "react";
import { HttpServices } from "./httpServices";
export default {
  title: "Services/HttpServices",
  component: HttpServices,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <HttpServices />;

export const component = Template.bind({});

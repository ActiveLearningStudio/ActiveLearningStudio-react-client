/* eslint-disable */
import React from "react";
import { MatricServices } from "./matricsServices";
export default {
  title: "Services/MatricServices",
  component: MatricServices,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <MatricServices />;

export const component = Template.bind({});

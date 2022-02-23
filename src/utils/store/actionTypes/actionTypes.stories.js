/* eslint-disable */
import React from "react";
import { ActionTypes } from "./actionTypes";
export default {
  title: "Store/ActionTypes",
  component: ActionTypes,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <ActionTypes />;

export const component = Template.bind({});

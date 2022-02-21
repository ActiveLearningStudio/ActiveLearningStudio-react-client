/* eslint-disable */
import React from "react";
import { GoogleLogin } from "./GoogleLogin";
export default {
  title: "Component/Modals/GoogleLoginModal",
  component: GoogleLogin,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <GoogleLogin />;

export const component = Template.bind({});

/* eslint-disable */
import React from "react";
import { Story, Meta } from "@storybook/react";

import { Footer } from "./footer.js";

export default {
  title: "Component/Footer/Index",
  component: Footer,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <Footer />;

export const component = Template.bind({});

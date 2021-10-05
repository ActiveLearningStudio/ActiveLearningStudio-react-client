/*eslint-disable*/
import React from "react";
import Tabs from "./tabs";

export default {
  title: "Utilities/Tabs",
  component: Tabs,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <Tabs {...args} />;

export const TabsProps = Template.bind({});

TabsProps.args = {
  image: "",
  text: "",
  color: "",
  className: "",
};

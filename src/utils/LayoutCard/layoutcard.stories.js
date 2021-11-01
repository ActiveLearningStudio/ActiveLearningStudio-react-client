/*eslint-disable*/
import React from "react";
import LayoutCard from "./layoutcard";

export default {
  title: "Utilities/LayoutCard",
  component: LayoutCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <LayoutCard {...args} />;

export const LayoutCardProps = Template.bind({});

LayoutCardProps.args = {
  image: "",
  text: "",
  color: "",
  className: "",
};

/*eslint-disable*/
import React from "react";
import TopHeading from "./topheading";

export default {
  title: "Utilities/TopHeading",
  component: TopHeading,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <TopHeading {...args} />;

export const TopHeadingProps = Template.bind({});

TopHeadingProps.args = {
  description: "",
  image: "",
  heading: "",
  color: "",
};

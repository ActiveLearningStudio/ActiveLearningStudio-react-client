/*eslint-disable*/
import React from "react";
import HeadingThree from "./headingthree";

export default {
  title: "Utilities/HeadingThree",
  component: HeadingThree,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <HeadingThree {...args} />;

export const HeadingThreeProps = Template.bind({});

HeadingThreeProps.args = {
  text: "",
  color: "",
  className: "",
};

/*eslint-disable*/
import React from "react";
import HeadingTwo from "./headingtwo";

export default {
  title: "Utilities/HeadingTwo",
  component: HeadingTwo,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <HeadingTwo {...args} />;

export const HeadingTwoProps = Template.bind({});

HeadingTwoProps.args = {
  text: "",
  color: "",
  className: "",
};

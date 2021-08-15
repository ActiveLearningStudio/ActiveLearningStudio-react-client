/*eslint-disable*/
import React from "react";
import HeadingText from "./headingtext";

export default {
  title: "Utilities/HeadingText",
  component: HeadingText,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <HeadingText {...args} />;

export const HeadingTextProps = Template.bind({});

HeadingTextProps.args = {
  text: "",
  color: "",
  className: "",
};

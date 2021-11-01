/*eslint-disable*/
import React from "react";
import InputLabel from "./inputlabel";

export default {
  title: "Utilities/InputLabel",
  component: InputLabel,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <InputLabel {...args} />;

export const InputLabelProps = Template.bind({});

InputLabelProps.args = {
  text: "",
  color: "",
  className: "",
  id: "",
};

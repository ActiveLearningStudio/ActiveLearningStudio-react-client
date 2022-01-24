/*eslint-disable*/
import React from "react";
import InputTextField from "./inputtextfield";

export default {
  title: "Utilities/InputTextField",
  component: InputTextField,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <InputTextField {...args} />;

export const InputTextFieldProps = Template.bind({});

InputTextFieldProps.args = {
  className: "",
  id: "",
  placeholder: "",
  value: "",
  onChange: "",
};

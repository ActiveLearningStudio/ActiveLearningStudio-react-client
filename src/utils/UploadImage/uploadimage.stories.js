/*eslint-disable*/
import React from "react";
import UploadImage from "./uploadimage";

export default {
  title: "Utilities/UploadImage",
  component: UploadImage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <UploadImage {...args} />;

export const UploadImageProps = Template.bind({});

UploadImageProps.args = {
  text: "",
  color: "",
  className: "",
  id: "",
};

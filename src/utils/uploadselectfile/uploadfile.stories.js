/*eslint-disable*/
import React from "react";
import UploadFile from "./uploadfile";

export default {
  title: "Utilities/UploadFile",
  component: UploadFile,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <UploadFile {...args} />;

export const UploadFileProps = Template.bind({});

UploadFileProps.args = {
  className: "",
};

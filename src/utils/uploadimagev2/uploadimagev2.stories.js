/*eslint-disable*/
import React from "react";
import UploadImageV2 from "./uploadimagev2";

export default {
  title: "Utilities/UploadImageV2",
  component: UploadImageV2,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <UploadImageV2 {...args} />;

export const UploadImageV2Props = Template.bind({});

UploadImageV2Props.args = {
  className: "",
};

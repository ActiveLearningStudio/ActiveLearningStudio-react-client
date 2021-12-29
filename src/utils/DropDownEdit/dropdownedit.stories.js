/*eslint-disable*/
import React from "react";
import DropDownEdit from "./dropdownedit";

export default {
  title: "Utilities/DropDownEdit",
  component: DropDownEdit,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <DropDownEdit {...args} />;

export const DropDownEditProps = Template.bind({});

DropDownEditProps.args = {
  iconColor: "",
};

/*eslint-disable*/
import React from "react";
import AddVideoCard from "./addvideocard";
import ProjectBg from "assets/images/myproject1.png";
export default {
  title: "Utilities/AddVideoCard",
  component: AddVideoCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <AddVideoCard {...args} />;

export const AddVideoCardProps = Template.bind({});

AddVideoCardProps.args = {
  className: "",
  title: "Activity No# 2",
  backgroundImg: ProjectBg,
  listView: false,
  selectionStatus: true,
};

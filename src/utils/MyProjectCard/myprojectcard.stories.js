/*eslint-disable*/
import React from "react";
import MyProjectCard from "./myprojectcard";
import ProjectBg from "assets/images/myproject1.png";
export default {
  title: "Utilities/MyProjectCard",
  component: MyProjectCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <MyProjectCard {...args} />;

export const MyProjectCardProps = Template.bind({});

MyProjectCardProps.args = {
  className: "",
  title: "",
  backgroundImg: ProjectBg,
};

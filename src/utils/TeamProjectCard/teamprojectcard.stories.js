/*eslint-disable*/
import React from "react";
import TeamProjectCard from "./teamprojectcard";
import ProjectBg from "assets/images/myproject1.png";
export default {
  title: "Utilities/TeamProjectCard",
  component: TeamProjectCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <TeamProjectCard {...args} />;

export const TeamProjectCardProps = Template.bind({});

TeamProjectCardProps.args = {
  className: "",
  title: "",
  backgroundImg: ProjectBg,
};

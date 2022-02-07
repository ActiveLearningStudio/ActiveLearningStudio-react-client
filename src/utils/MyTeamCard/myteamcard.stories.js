/*eslint-disable*/
import React from "react";
import MyTeamCard from "./myteamcard";
import ProjectBg from "assets/images/myproject1.png";
export default {
  title: "Utilities/MyTeamCard",
  component: MyTeamCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <MyTeamCard {...args} />;

export const MyTeamCardProps = Template.bind({});

MyTeamCardProps.args = {
  className: "",
  title: "",
  backgroundImg: ProjectBg,
};

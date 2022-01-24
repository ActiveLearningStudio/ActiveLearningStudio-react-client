/*eslint-disable*/
import React from "react";
import ProjectPlayListCard from "./projectplaylistcard";
import PlayListImage from "assets/images/svg/playlist1.svg";
export default {
  title: "Utilities/ProjectPlayListCard",
  component: ProjectPlayListCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <ProjectPlayListCard {...args} />;
const playList = [
  { img: PlayListImage, title: "Guess the Answer" },
  { img: PlayListImage, title: "Summary" },
];
export const ProjectPlayListCardProps = Template.bind({});

ProjectPlayListCardProps.args = {
  className: "",
  playList: playList,
  title: "",
};

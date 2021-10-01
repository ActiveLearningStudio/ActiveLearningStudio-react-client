/*eslint-disable*/
import React from "react";
import ProjectPlayList from "./projectplaylist";
import PlayListImage from "assets/images/svg/playlist1.svg";
export default {
  title: "Utilities/ProjectPlayList",
  component: ProjectPlayList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const playList = [
  { img: PlayListImage, title: "Guess the Answer" },
  { img: PlayListImage, title: "Summary" },
];
const Template = (args) => <ProjectPlayList {...args} />;

export const ProjectPlayListProps = Template.bind({});

ProjectPlayListProps.args = {
  className: "",
  playList: playList,
};

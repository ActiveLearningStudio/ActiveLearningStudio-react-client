/*eslint-disable*/
import React from "react";
import ProjectList from "./projectlist";
import PlayListImage from "assets/images/svg/playlist1.svg";
export default {
  title: "Utilities/ProjectList",
  component: ProjectList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const playList = [
  { title: "Activity #1" },
  { title: "Activity #2" },
  { title: "My first activity", status: "Shared" },
];
const Template = (args) => <ProjectList {...args} />;

export const ProjectPlayListProps = Template.bind({});

ProjectPlayListProps.args = {
  className: "",
  playList: playList,
  projectTitle: "Playlist name #3",
};

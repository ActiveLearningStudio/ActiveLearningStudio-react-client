/*eslint-disable*/
import React from "react";
import VideoCard from "./videocard";

export default {
  title: "Utilities/VideoCard",
  component: VideoCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <VideoCard {...args} />;

export const VideoCardProps = Template.bind({});

VideoCardProps.args = {
  className: "",
};

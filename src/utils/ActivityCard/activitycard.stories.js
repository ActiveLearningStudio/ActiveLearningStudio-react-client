/*eslint-disable*/
import React from "react";
import ActivityCardBox from "./activitycard";
import CardImage from "assets/images/activitycard.png";
export default {
  title: "Utilities/ActivityCardBox",
  component: ActivityCardBox,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <ActivityCardBox {...args} />;

export const ActivityCardBoxProps = Template.bind({});

ActivityCardBoxProps.args = {
  img: CardImage,
  title: "My first activity created",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
  listView: false,
  status: "published",
};

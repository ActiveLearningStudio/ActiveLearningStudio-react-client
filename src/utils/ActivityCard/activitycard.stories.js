/*eslint-disable*/
import React from "react";
import ActivityCardBox from "./activitycard";

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
  img: "",
  title: "",
  description: "",
  icon: "",
};

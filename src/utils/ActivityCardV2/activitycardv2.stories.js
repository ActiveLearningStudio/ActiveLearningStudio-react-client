/*eslint-disable*/
import React from "react";
import ActivityCardV2 from "./activitycardv2";
import ProjectBg from "assets/images/myproject1.png";
export default {
  title: "Utilities/ActivityCardV2",
  component: ActivityCardV2,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <ActivityCardV2 {...args} />;

export const ActivityCardV2Props = Template.bind({});

ActivityCardV2Props.args = {
  className: "",
  title: "Activity No# 2",
  backgroundImg: ProjectBg,
  listView: false,
  selectionStatus: true,
};

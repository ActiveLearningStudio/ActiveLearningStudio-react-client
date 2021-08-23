/*eslint-disable*/
import React from "react";
import ActivityCardDropDown from "./activitycarddropdown";

export default {
  title: "Utilities/ActivityCardDropDown",
  component: ActivityCardDropDown,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <ActivityCardDropDown {...args} />;

export const ActivityCardDropDownProps = Template.bind({});

ActivityCardDropDownProps.args = {
  iconColor: "",
};

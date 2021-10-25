/*eslint-disable*/
import React from "react";
import ActivityProjectCardDropDown from "./activityprojectdropdown";

export default {
  title: "Utilities/ActivityProjectCardDropDown",
  component: ActivityProjectCardDropDown,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <ActivityProjectCardDropDown {...args} />;

export const ActivityCardDropDownProps = Template.bind({});

ActivityCardDropDownProps.args = {
  iconColor: "",
};

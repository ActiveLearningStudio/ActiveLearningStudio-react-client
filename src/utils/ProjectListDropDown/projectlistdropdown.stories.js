/*eslint-disable*/
import React from "react";
import ProjectListDropDown from "./projectlistdropdown";

export default {
  title: "Utilities/ProjectListDropDown",
  component: ProjectListDropDown,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <ProjectListDropDown {...args} />;

export const ProjectListDropDownProps = Template.bind({});

ProjectListDropDownProps.args = {
  iconColor: "",
};

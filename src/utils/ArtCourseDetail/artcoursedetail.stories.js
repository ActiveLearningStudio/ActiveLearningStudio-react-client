/*eslint-disable*/
import React from "react";
import ArtCourseDetail from "./artcoursedetail";

export default {
  title: "Utilities/ArtCourseDetail",
  component: ArtCourseDetail,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <ArtCourseDetail {...args} />;

export const ArtCourseDetailProps = Template.bind({});

ArtCourseDetailProps.args = {
  className: "",
};

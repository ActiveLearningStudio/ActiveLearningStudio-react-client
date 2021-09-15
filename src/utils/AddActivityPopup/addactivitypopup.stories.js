/*eslint-disable*/
import React from "react";
import AddActivityPopup from "./addactivitypopup";

export default {
  title: "Utilities/AddActivityPopup",
  component: AddActivityPopup,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <AddActivityPopup {...args} />;

export const AddActivityPopupProps = Template.bind({});

AddActivityPopupProps.args = {
  className: "",
};

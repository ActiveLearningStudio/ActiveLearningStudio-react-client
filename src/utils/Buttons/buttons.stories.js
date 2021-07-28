import React from 'react';
import Buttons from './buttons';

export default {
  title: 'Utilities/Buttons',
  component: Buttons,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Buttons {...args} />;

export const ButtonProps = Template.bind({});

ButtonProps.args = {
  primary: false,
  secondary: false,
  defaultgrey: false,
  defaultwhite: false,
  icon: '',
  width: '',
  height: '',
  radius: '',
  text: '',
};

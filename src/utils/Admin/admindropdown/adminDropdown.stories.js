/* eslint-disable */
import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Admindropdown } from './admindropdown.js';

export default {
  title: 'Admin/Admindropdown',
  component: Admindropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = () => <Admindropdown />;

export const component = Template.bind({});

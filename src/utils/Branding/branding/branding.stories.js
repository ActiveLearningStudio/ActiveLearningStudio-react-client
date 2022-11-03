/* eslint-disable */
import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Branding } from './branding';

export default {
  title: 'Branding/Index',
  component: Branding,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = () => <Branding />;

export const component = Template.bind({});

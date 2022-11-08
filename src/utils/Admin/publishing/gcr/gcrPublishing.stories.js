/* eslint-disable */
import React from 'react';
import { Story, Meta } from '@storybook/react';

import { GcrPublishing } from './gcrPublishing';

export default {
  title: 'Admin/Publishing/Google Classroom',
  component: GcrPublishing,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = () => <GcrPublishing />;

export const component = Template.bind({});

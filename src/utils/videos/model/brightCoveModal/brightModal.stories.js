/* eslint-disable */
import React from 'react';
import { Story, Meta } from '@storybook/react';

import { BrightModal } from './brightModal.js';

export default {
  title: 'Videos/model/brightmodel',
  component: BrightModal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = () => <BrightModal />;

export const component = Template.bind({});

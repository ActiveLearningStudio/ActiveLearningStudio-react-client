/* eslint-disable */
import React from 'react';
import { Story, Meta } from '@storybook/react';

import { CanvasLtiLogin } from './canvasLtiLogin';

export default {
  title: 'Auth/Canvas Lti Login',
  component: CanvasLtiLogin,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = () => <CanvasLtiLogin />;

export const component = Template.bind({});

/* eslint-disable */
import React from 'react';
import { Story, Meta } from '@storybook/react';

import { DescribeVideo } from './describeVideo.js';

export default {
  title: 'Videos/Formik/DescribeVideo',
  component: DescribeVideo,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = () => <DescribeVideo />;

export const component = Template.bind({});

/* eslint-disable */
import React from 'react';
import { Story, Meta } from '@storybook/react';

import { AddVideo } from './addvideo.js';

export default {
  title: 'Videos/Formik/AddVideo',
  component: AddVideo,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = () => <AddVideo />;

export const component = Template.bind({});

/* eslint-disable */
import React from 'react';
import { CloneModel } from './cloneModal';
export default {
  title: 'Search/CloneModel',
  component: CloneModel,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = () => <CloneModel />;

export const component = Template.bind({});

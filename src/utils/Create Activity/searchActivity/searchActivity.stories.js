/* eslint-disable */
import React from 'react';
import { SearchAActivity } from './searchActivity';

export default {
  title: 'Create Activity/Search Activity',
  component: SearchAActivity,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = () => <SearchAActivity />;

export const component = Template.bind({});

/* eslint-disable */
import React from 'react';
import { SearchNetlify } from './searchNetlify';
export default {
  title: 'Search/SearcNetlify',
  component: SearchNetlify,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = () => <SearchNetlify />;

export const component = Template.bind({});

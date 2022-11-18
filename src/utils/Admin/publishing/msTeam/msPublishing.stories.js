/* eslint-disable */
import React from 'react';
import { Story, Meta } from '@storybook/react';

import { MsTeam } from './msTeam';

export default {
  title: 'Admin/Publishing/Microsoft Team',
  component: MsTeam,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = () => <MsTeam />;

export const component = Template.bind({});

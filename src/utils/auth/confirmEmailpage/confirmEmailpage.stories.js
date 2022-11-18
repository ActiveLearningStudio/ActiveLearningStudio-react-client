/* eslint-disable */
import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ConfirmEmail } from './confirmEmailPage';

export default {
  title: 'Auth/ConfirmEmail',
  component: ConfirmEmail,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = () => <ConfirmEmail />;

export const component = Template.bind({});

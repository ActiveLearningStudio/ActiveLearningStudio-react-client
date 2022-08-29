/* eslint-disable no-unused-vars */
import React from 'react';
import StartingPageTwo from './startingpage';

export default {
  title: 'Utilities/StartingPage',
  component: StartingPageTwo(),
  argTypes: {
    primaryColor: '#2E68BF',
  },
};

const Template = (args) => <StartingPageTwo {...args} />;

export const StartingPageProps = Template.bind({});

StartingPageProps.args = {
  className: '',
  primaryColor: '#2E68BF',
  createBtnTitle: 'Create new activity ',
  helpBtnTitle: 'Help center',
  createTitle: '',
};

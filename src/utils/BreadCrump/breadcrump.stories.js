import React from 'react';
import BreadCrump from './breadcrump';

export default {
  title: 'Utilities/BreadCrump',
  component: BreadCrump,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <BreadCrump {...args} />;

export const BreadCrumpProps = Template.bind({});

BreadCrumpProps.args = {
  type: 'admin',
};

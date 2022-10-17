/* eslint-disable no-unused-vars */
import React from 'react';
import SubSearchBar from './subsearchbar';

export default {
  title: 'Utilities/SubSearchBar',
  component: SubSearchBar,
  argTypes: {},
};

const Template = (args) => <SubSearchBar {...args} />;

export const SubSearchBarProps = Template.bind({});

SubSearchBarProps.args = {
  className: '',
  pageCounterTitle: '',
};

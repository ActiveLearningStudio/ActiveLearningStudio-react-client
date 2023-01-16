/*eslint-disable*/
import React from 'react';
import KomodoCard from './komodocard';
import ProjectBg from 'assets/images/myproject1.png';
export default {
  title: 'Utilities/KomodoCard',
  component: KomodoCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <KomodoCard {...args} />;

export const KomodoCardProps = Template.bind({});

KomodoCardProps.args = {
  className: '',
};

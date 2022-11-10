/* eslint-disable */
import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ProjectCard } from './projectCard';

export default {
  title: 'component/Skeletons/ProjectCard',
  component: ProjectCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = () => <ProjectCard />;

export const component = Template.bind({});

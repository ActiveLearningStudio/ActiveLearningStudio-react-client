/* eslint-disable */
import React from 'react';
import CardSnippet from '!!raw-loader!../../../containers/Projects/ProjectCard/index';
import card from './card.png';
import Dropdown from './dropdown.png';
import ProjectStore from '!!raw-loader!../../../store/actions/project';
import { ProjCard } from './ProjCard';
import DropdownSnippet from '!!raw-loader!../../../containers/Projects/ProjectCard/ProjectCardDropdown';
import Stylesheet from '!!raw-loader!../../../containers/Projects/ProjectCard/style.scss';
export default {
  title: 'My projects/ProjectCard',
  component: ProjCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <ProjCard {...args} />;

export const index = Template.bind({});

index.args = {
  componentName: 'ProjectCard',
  path: '/src/containers/Projects/ProjectCard/index.js',
  description:
    ' This component is used for making project cards. ' +
    'It means that only one component is created to show the details of every project on the card.' +
    'In the card, you will see the image of the project, project title, and description. At bottom of the card,' +
    ' you will see three buttons where you can add more information to the project.' +
    'You will see a share button and one dropdown to edit, duplicate, delete and publish the project.',
  codeSnippet: CardSnippet,
  libraryUsed: ['react-bootstrap', 'react-redux', 'react-fontawesome', 'react-router-dom', 'prop-types', 'Swal'],
  customHooks: [
    { name: '/src/components/SharePreviewPopup/index', url: '' },
    {
      name: '/src/containers/Projects/ProjectCard/ProjectCardDropdown',
      url: '?path=/story/my-projects-projectcard--project-card-dropdown',
    },
    {
      name: '/src/containers/Projects/ProjectPreviewModal/index',
      url: '?path=/story/my-projects-samplepreviewmodal--component',
    },
  ],
  reduxStore: [{ path: 'store/actions/project', pathCode: ProjectStore }],
  apiUsed: [],
  //customHooks={['./formik/createOrg','removeActiveAdminForm']}
  images: card,
  stylesheetUsed: Stylesheet,
  example: 'https://dev.currikistudio.org/org/currikistudio',
};

export const ProjectCardDropdown = Template.bind({});

ProjectCardDropdown.args = {
  componentName: 'ProjectCardDropdown',
  path: '/src/containers/Projects/ProjectCard/ProjectCardDropdown.js',
  description:
    'In the card dropdown component, you can preview, edit, duplicate, share,' +
    'publish and delete your project.' +
    'This component will be used to make a dropdown around every project card.',
  codeSnippet: DropdownSnippet,
  libraryUsed: ['react-bootstrap', 'react-redux', 'react-fontawesome', 'react-router-dom', 'prop-types', 'Swal'],
  customHooks: [],
  reduxStore: [{ path: 'store/actions/project', pathCode: ProjectStore }],
  apiUsed: [],
  //customHooks={['./formik/createOrg','removeActiveAdminForm']}
  images: Dropdown,
  stylesheetUsed: Stylesheet,
  example: 'https://dev.currikistudio.org/org/currikistudio',
};

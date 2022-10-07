/*eslint-disable*/
import React from 'react';
import OverlayTriggerPop from './overlaytiggerpop';

export default {
  title: 'Utilities/OverlayTriggerPop',
  component: OverlayTriggerPop,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <OverlayTriggerPop {...args} />;

export const OverlayTriggerPopProps = Template.bind({});

OverlayTriggerPopProps.args = {
  className: '',
};

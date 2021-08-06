import React from 'react';
import PropTypes from 'prop-types';

const Buttons = ({ text }) => (
  <div className="utility curriki-theme-button">
    {text}
  </div>
  );

Buttons.propTypes = {
  text: PropTypes.string.isRequired,
};
export default Buttons;

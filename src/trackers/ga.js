import ReactGA from 'react-ga';

// eslint-disable-next-line import/prefer-default-export
export const Event = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

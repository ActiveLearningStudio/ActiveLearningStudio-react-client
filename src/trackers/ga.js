import ReactGA from 'react-ga';

export const Event = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

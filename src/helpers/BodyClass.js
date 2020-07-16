import { useEffect } from 'react';

const addBodyClass = (className) => document.body.classList.add(className);
const removeBodyClass = (className) => document.body.classList.remove(className);

export default function useBodyClass(className) {
  useEffect(
    () => {
      // Set up
      if (className instanceof Array) {
        className.map(addBodyClass);
      } else {
        addBodyClass(className);
      }

      // Clean up
      return () => {
        if (className instanceof Array) {
          className.map(removeBodyClass);
        } else {
          removeBodyClass(className);
        }
      };
    },
    [className],
  );
}

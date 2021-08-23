import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

export function getErrors(e) {
  if (e.errors) {
    if (!Array.isArray(e.errors) && typeof e.errors === 'object') {
      let errors = [];
      Object.keys(e.errors).forEach((key) => {
        if (Array.isArray(e.errors[key])) {
          errors = errors.concat(e.errors[key]);
        }
      });

      return { errors };
    }
  }

  return e;
}

export const required = (value) => (!!value && value.trim() ? undefined : '* Required');

export const maxLength = (max) => (value) => (value && value.length > max
  ? `* Must be ${max} characters or less`
  : undefined);

const fadeAnimation = keyframes`${fadeIn}`;
export const FadeDiv = styled.div`
  animation: 0.8s ${fadeAnimation};
`;

export const zeroFill = (value) => {
  const newValue = `00${value}`;
  return newValue.slice(newValue.length - 2, newValue.length);
};

export const alphaNumeric = (value) => {
  const alphaNumericRegex = new RegExp('[^0-9a-zA-Z@ ._-]');
  return !alphaNumericRegex.test(value);
};

export const alphabetsOnly = (value) => {
  const alphaNumericRegex = new RegExp('[^a-zA-Z]');
  return !alphaNumericRegex.test(value);
};

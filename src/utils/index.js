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

export const required = (value) => (value ? undefined : '* Required');

export const maxLength = (max) => (value) => (value && value.length > max
  ? `* Must be ${max} characters or less`
  : undefined);

const fadeAnimation = keyframes`${fadeIn}`;
export const FadeDiv = styled.div`
  animation: 0.8s ${fadeAnimation};
`;

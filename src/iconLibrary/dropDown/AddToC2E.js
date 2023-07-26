/* eslint-disable */
import React from "react";

const AddToC2E = ({ primaryColor, className = "" }) => (
  <>
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.75 12.6667C14.75 13.0203 14.6078 13.3594 14.3546 13.6095C14.1014 13.8595 13.758 14 13.4 14H2.6C2.24196 14 1.89858 13.8595 1.64541 13.6095C1.39223 13.3594 1.25 13.0203 1.25 12.6667V3.33333C1.25 2.97971 1.39223 2.64057 1.64541 2.39052C1.89858 2.14048 2.24196 2 2.6 2H5.975L7.325 4H13.4C13.758 4 14.1014 4.14048 14.3546 4.39052C14.6078 4.64057 14.75 4.97971 14.75 5.33333V12.6667Z"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 7.33203V11.332"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.97461 9.33203H10.0246"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </>
);

export default AddToC2E;

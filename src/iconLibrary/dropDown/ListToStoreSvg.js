/* eslint-disable  */
/* eslint-disable react/prop-types */
import React from "react";

const ListToStoreSvg = ({ primaryColor, className = "" }) => (
  <svg
    className={className}
    width="16"
    height="14"
    viewBox="0 0 16 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Folder">
      <path
        id="Path"
        d="M1 3.10938V12.4427C1 12.8723 1.34823 13.2205 1.77778 13.2205H14.2222C14.6518 13.2205 15 12.8723 15 12.4427V4.18631C15 3.75676 14.6518 3.40853 14.2222 3.40853H8.71795"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        id="Path_2"
        d="M8.71795 3.40984L6.55831 0.891249C6.48543 0.818317 6.3865 0.777344 6.28336 0.777344H1.38889C1.17411 0.777344 1 0.951457 1 1.16623V3.11068"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export default ListToStoreSvg;

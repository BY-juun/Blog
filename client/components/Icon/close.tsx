import React from "react";

const CloseIcon = ({ fill }: { fill: string }) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 21.2262L4.45817 34.2681C3.97021 34.756 3.34918 35 2.59506 35C1.84094 35 1.2199 34.756 0.731938 34.2681C0.243979 33.7801 0 33.1591 0 32.4049C0 31.6508 0.243979 31.0298 0.731938 30.5418L13.7738 17.5L0.731938 4.45817C0.243979 3.97021 0 3.34918 0 2.59506C0 1.84094 0.243979 1.2199 0.731938 0.731938C1.2199 0.243979 1.84094 0 2.59506 0C3.34918 0 3.97021 0.243979 4.45817 0.731938L17.5 13.7738L30.5418 0.731938C31.0298 0.243979 31.6508 0 32.4049 0C33.1591 0 33.7801 0.243979 34.2681 0.731938C34.756 1.2199 35 1.84094 35 2.59506C35 3.34918 34.756 3.97021 34.2681 4.45817L21.2262 17.5L34.2681 30.5418C34.756 31.0298 35 31.6508 35 32.4049C35 33.1591 34.756 33.7801 34.2681 34.2681C33.7801 34.756 33.1591 35 32.4049 35C31.6508 35 31.0298 34.756 30.5418 34.2681L17.5 21.2262Z"
        fill={fill}
      />
    </svg>
  );
};

export default CloseIcon;
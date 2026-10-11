import React from 'react';

export const DentalLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect width="40" height="40" rx="12" fill="#FF705E" fillOpacity="0.15" />
    <path
      d="M20 9C15.5 9 12 12.5 12 17C12 21 14 24.5 16 27.5C17.5 29.8 19 32 20 32C21 32 22.5 29.8 24 27.5C26 24.5 28 21 28 17C28 12.5 24.5 9 20 9Z"
      stroke="#FF705E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 17C17 18.7 18.3 20 20 20C21.7 20 23 18.7 23 17"
      stroke="#55284F"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="20" cy="14" r="1.5" fill="#FF705E" />
  </svg>
);

export const StarIcon: React.FC<{ className?: string; filled?: boolean }> = ({
  className = "w-5 h-5",
  filled = true,
}) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

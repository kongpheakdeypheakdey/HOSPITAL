import React from 'react';

interface HospitalLogoProps {
  className?: string;
}

export const HospitalLogo: React.FC<HospitalLogoProps> = ({ className = '' }) => {
  return (
    <img
      src="/image/logo.png"
      alt="Luang Mè Hospital Logo"
      className={className}
      draggable={false}
      style={{ objectFit: 'contain', display: 'block' }}
    />
  );
};

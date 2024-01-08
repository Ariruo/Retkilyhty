import React from 'react';

interface DescriptionProps {
  description: string;
  style?: React.CSSProperties;
}

const Description: React.FC<DescriptionProps> = ({ description, style }) => {
  return (
    <>
      <p style={style}>{description}</p>
    </>
  );
};

export default Description;

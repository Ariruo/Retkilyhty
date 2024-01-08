import React from 'react';

interface UpdatedAtProps {
  updatedAt: string;
  style?: React.CSSProperties;
}

const UpdatedAt: React.FC<UpdatedAtProps> = ({ updatedAt, style }) => {
  return (
    <>
      <p style={style}>{updatedAt}</p>
    </>
  );
};

export default UpdatedAt;

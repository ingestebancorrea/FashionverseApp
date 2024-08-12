import React from 'react';
import { Logo } from '../../components';

export const Header = ({ children, ...props }) => {
  return (
    <Logo width={160} height={60} />
  );
};

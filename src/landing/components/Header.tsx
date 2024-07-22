import React from 'react';
import { View } from 'react-native';
import { Logo } from '../../components';

export const Header = () => {
  return (
    <View style={{
      backgroundColor: '#F2EDE0',
    }}>
      <Logo width={150} height={60} />
    </View>
  );
};

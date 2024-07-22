import React from 'react';
import { View } from 'react-native';

export const Background = () => {
  return (
    <View
        style={{
            position: 'absolute',
            backgroundColor: '#F2EDE0',
            top: -330,
            width: 1000,
            height: 1200,
            transform: [
              { rotate: '-70deg' },
            ], // Girar div
        }}
    />
  );
};

import React from 'react';
import { Image, View } from 'react-native';

interface Props {
  height: number;
  width: number;
}

export const Logo = ({ height = 100, width = 220 }: Props) => {
  return (
    <View style={{
      alignItems: 'center',
    }}>
      <Image
        source={require('../assets/logo.png')}
        style={{
          width,
          height,
        }}
      />
    </View>
  );
};

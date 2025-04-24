import React from 'react';
import { DimensionValue, View } from 'react-native';

interface Props {
  width?: DimensionValue | undefined;
}

export const ItemSeparator = ({ width = '100%' }: Props) => {

  return (
    <View style={{
      width,
      marginHorizontal: 5,
        borderBottomWidth: 2,
        marginVertical: 5,
        borderBottomColor: '#D3D3D3'
      }}
    />
  );
};

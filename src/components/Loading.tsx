import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export const Loading = () => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <ActivityIndicator
        size={50}
        color="#DEA76B"
      />
    </View>
  );
};

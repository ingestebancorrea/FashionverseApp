import React from 'react';
import { StyleSheet, View } from 'react-native';

export const Background = () => {
  return (
    <View style={styles.backgroundContainer}/>
  );
};

const styles = StyleSheet.create({
    backgroundContainer: {
      position: 'absolute',
      backgroundColor: '#150F2B',
      width: 1000,
      height: 1200,
    },
});

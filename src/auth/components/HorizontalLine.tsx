import React from 'react';
import { View, StyleSheet } from 'react-native';

export const HorizontalLine = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.circle} />
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#201C3D',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#D7D3E3',
    backgroundColor: '#1A152C',
    marginHorizontal: 8,
  },
});

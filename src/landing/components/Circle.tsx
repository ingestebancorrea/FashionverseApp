import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
    backgroundColor: string;
}

export const Circle = ({ backgroundColor }: Props) => {
  return (
    <View style={{...styles.circle,backgroundColor}} />
  );
};

const styles = StyleSheet.create({
    circle: {
        width: 25,
        height: 25,
        borderRadius: 100 / 2,
    },
});

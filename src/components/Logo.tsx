import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface Props {
  height?: number;
  width?: number;
}

export const Logo = ({ height = 100, width = 220 }: Props) => {
  return (
    <View style={styles.parentContainer}>
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

const styles = StyleSheet.create({
  parentContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { loginStyles } from '../../theme/loginTheme';

interface Props {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
}

export const CustomPassword = ({ placeholder, value, onChange }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="black"
        secureTextEntry={!isPasswordVisible}
        value={value}
        onChangeText={onChange}
        style={[{ flex: 4, width: '100%', color: 'black',
        fontSize: 20 }, (Platform.OS === 'ios') && loginStyles.inputFieldIOS,]}
      />
      <TouchableOpacity onPress={togglePasswordVisibility} style={{ flex: 1 }}>
        <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="black" style={{ marginLeft: 30 }} />
      </TouchableOpacity>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '100%', // Ancho igual al TextInput
    position: 'absolute',
    bottom: 0,
  },
});

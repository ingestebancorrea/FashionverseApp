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
    <View style={loginStyles.inputContainer}>
      <Ionicons name="lock-closed" size={20} color="#D7D3E3" style={loginStyles.icon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#BEBFC9"
        underlineColorAndroid="transparent"
        secureTextEntry={!isPasswordVisible}
        value={value}
        onChangeText={onChange}
        style={[styles.textInput, (Platform.OS === 'ios') && loginStyles.inputFieldIOS,]}
      />
      <TouchableOpacity onPress={togglePasswordVisibility} style={{ flex: 1 }}>
        <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color="white" style={{ marginLeft: 30 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    flex: 4,
    width: '100%',
    color: 'white',
    fontSize: 16,
  },
});

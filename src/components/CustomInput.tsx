import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { loginStyles } from '../theme/loginTheme';

interface Props extends TextInputProps {
  icon: string;
  onChangeText: (text: string) => void;
}

export const CustomInput = ({ onChangeText, ...props }: Props) => {
  return (
    <View style={loginStyles.inputContainer}>
      <Ionicons name={props.icon} size={20} color="#D7D3E3" style={loginStyles.icon} />
      <TextInput
        placeholderTextColor="#BEBFC9"
        underlineColorAndroid="transparent"
        style={loginStyles.inputField}
        selectionColor="#D7D3E3"
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};

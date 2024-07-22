import React from 'react';
import { TextInput, Platform, TextInputProps, View } from 'react-native';
import { loginStyles } from '../theme/loginTheme';

interface Props extends TextInputProps {
  onChange: (text: string) => void;
}

export const CustomInput = ({ onChange, ...props }: Props) => {
  return (
    <View>
      <TextInput
        placeholderTextColor="black"
        underlineColorAndroid="black"
        style={[
          loginStyles.inputField,
          (Platform.OS === 'ios') && loginStyles.inputFieldIOS,
        ]}
        selectionColor="black"
        onChangeText={onChange}
        {...props} // Spread the remaining props
      />
    </View>
  );
};

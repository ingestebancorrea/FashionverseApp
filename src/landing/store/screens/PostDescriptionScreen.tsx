import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import {landingStyles} from '../../../theme/landingTheme';
import {CustomButton} from '../../../components';

export const PostDescriptionScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const onNavigate = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <View style={landingStyles.mainContainer}>
      <Text style={landingStyles.title}>Agrega una descripción</Text>

      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Escribe algo..."
          placeholderTextColor="grey"
          numberOfLines={10}
          multiline={true}
        />
      </View>

      <View style={{ height: 440 }}></View>

      {/* Botones */}
      <View style={landingStyles.buttonContainer}>
        <CustomButton
          label="Confirmar"
          style={landingStyles.button}
          onEvent={() => onNavigate('PostTypesScreen')}
        />

        <TouchableOpacity onPress={() => onNavigate('StorePostsScreen')}>
          <Text style={[landingStyles.cancelText, landingStyles.linkText]}>
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: '#dddddd',
    borderWidth: 1,
    padding: 5,
    marginHorizontal: 8,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
  },
});

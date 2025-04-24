import React, { useContext } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { landingStyles } from '../../../theme/landingTheme';
import { CustomButton } from '../../../components';
import { yupResolver } from '@hookform/resolvers/yup';
import { postSchema } from '../schemas/store.schema';
import { PostsContext } from '../../../context/landing/store/PostsContext';
import { PostRequest } from '../interfaces/store.interfaces';

export const PostDescriptionScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { startSavePost } = useContext(PostsContext);
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      description: '',
    },
    resolver: yupResolver(postSchema),
  });

  const onSubmit = (data) => {
    Keyboard.dismiss();

    const objPost: PostRequest = {
      description: data.description,
    };

    startSavePost(objPost);
    navigation.navigate('PostTypesScreen');
  };

  return (
    <View style={landingStyles.mainContainer}>
      <Text style={landingStyles.title}>Agrega una descripción</Text>

      <View style={styles.textAreaContainer}>
        <Controller
          defaultValue=""
          name="description"
          control={control}
          render={({ field: { onChange, value: inputValue } }) => (
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Escribe algo..."
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
              value={inputValue || undefined}
              onChangeText={onChange}
              autoCorrect={false}
            />
          )}
        />
        {errors.description && <Text style={{ color: 'red' }}>{errors.description.message}</Text>}
      </View>

      <View style={{ height: 440 }}></View>

      {/* Botones */}
      <View style={landingStyles.buttonContainer}>
        <CustomButton
          label="Confirmar"
          style={landingStyles.button}
          onEvent={handleSubmit(onSubmit)}
        />

        <TouchableOpacity onPress={() => navigation.navigate('StorePostsScreen')}>
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

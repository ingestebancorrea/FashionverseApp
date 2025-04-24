import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { landingStyles } from '../../../theme/landingTheme';
import { CustomButton } from '../../../components';
import { postTypes } from '../data/postTypes';
import { StoreTypeCard } from '../components/StoreTypeCard';
import { PostsContext } from '../../../context/landing/store/PostsContext';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { postTypeSchema } from '../schemas/store.schema';
import { PostRequest } from '../interfaces/store.interfaces';
import { usePostResponse } from '../hooks/usePostResponse';

export const PostTypesScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { addPost, errorMessage } = useContext(PostsContext);
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      posttype: '',
    },
    resolver: yupResolver(postTypeSchema),
  });
  const [status, setStatus] = useState<number>();
  const [postId, setPostId] = useState<number>();
  const { handleErrorMenssage } = usePostResponse();

  const handleCardPress = (id: number) => {
    setSelectedId(prevId => prevId === id ? null : id);
  };

  const onSubmit = async (data) => {
    Keyboard.dismiss();

    const objPost: PostRequest = {
      posttype_id: +data.posttype,
    };

    const resp = await addPost(objPost);
    setPostId(resp?.data.id);
    setStatus(resp?.status);
  };

  useEffect(() => {
    if (status === 201) {
      navigation.navigate('StoreProductsScreen', { 'origin': 'PostTypes', 'postId': postId });
    }
  }, [status]);

  useEffect(() => {
    handleErrorMenssage(errorMessage,'Error en el registro.','StorePostsScreen');
  }, [errorMessage]);

  return (
    <View style={landingStyles.mainContainer}>
      <Text style={landingStyles.title}>
        Elige el tipo de publicación
      </Text>

      <FlatList
        data={postTypes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Controller
            control={control}
            name="posttype"
            render={({ field: { onChange } }) => (
              <StoreTypeCard
                storeType={item}
                isSelected={item.id === selectedId}
                onPress={() => {
                  onChange(item.id);
                  handleCardPress(item.id);
                }}
              />
            )}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      {errors.posttype && <Text style={{ color: 'red', textAlign: 'center' }}>{errors.posttype.message}</Text>}

      {/* Botones */}
      <View style={landingStyles.buttonContainer}>
        <CustomButton label="Confirmar" style={landingStyles.button} onEvent={handleSubmit(onSubmit)} />

        <TouchableOpacity onPress={() => navigation.navigate('StorePostsScreen')}>
          <Text style={[landingStyles.cancelText, landingStyles.linkText]}>
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>

      { /* Toast Notification */}
      <Toast
        position="top"
        bottomOffset={40}
      />
    </View>
  );
};

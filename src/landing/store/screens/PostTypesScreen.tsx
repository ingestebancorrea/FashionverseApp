import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { landingStyles } from '../../../theme/landingTheme';
import { CustomButton } from '../../../components';
import { postTypes } from '../data/posttypes';
import { StoreTypeCard } from '../components/StoreTypeCard';

export const PostTypesScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleCardPress = (id: number) => {
    setSelectedId(id);
  };

  const onNavigate = (screen: string) => {
    navigation.navigate(screen,{ 'origin': 'PostTypes' });
  };

  return (
    <View style={landingStyles.mainContainer}>
      <Text style={landingStyles.title}>
        Elige el tipo de publicación
      </Text>

      <FlatList
        data={postTypes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <StoreTypeCard
            storeType={item}
            isSelected={item.id === selectedId}
            onPress={() => handleCardPress(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ flexGrow: 1 }}
      />

      {/* Botones */}
      <View style={landingStyles.buttonContainer}>
        <CustomButton label="Confirmar" style={landingStyles.button} onEvent={() => onNavigate('StoreProductsScreen')} />

        <TouchableOpacity onPress={() => onNavigate('StorePostsScreen')}>
          <Text style={[landingStyles.cancelText, landingStyles.linkText]}>
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

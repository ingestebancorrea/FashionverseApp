import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { landingStyles } from '../../../theme/landingTheme';

interface Props {
  post: {
    id: number;
    likes: number;
    type: string;
    products: number;
    comments: number;
  }
  isSelected?: boolean;
  onPress: () => void;
}

export const PostCard = ({ post: { likes, type, products, comments }, isSelected = false, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        <View style={[landingStyles.cardContent, isSelected && landingStyles.selectedCard]}>
          {/* Contenedor de la imagen */}
          <Card.Cover
            source={{ uri: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRAEGyVTps19fd5nsqlq-cKoQwmSZ3R0_CvjxGDqZa3dfrX_Za3_pxA5zb1h8ebtUERfnGJnMLgUxGrdZWnGEWi4nZUBz-f22jyHIJbXLy5H8XG-gHjpCSp&usqp=CAE' }}
            style={landingStyles.cover}
          />

          {/* Contenedor textos */}
          <View style={landingStyles.textContainer}>
            {/* Detalles de productos */}
            <View style={landingStyles.productsContainer}>
              {/* Contenedor izquierda*/}
              <View style={landingStyles.detailsContainer}>
                <View style={landingStyles.detail}>
                  <Icon name="heart-outline" size={20} color="#DEA76B" />
                  <Text style={landingStyles.bodyText}>{likes}</Text>
                </View>

                <View style={landingStyles.detail}>
                  <Icon name="shirt-outline" size={20} color="#DEA76B" />
                  <Text style={landingStyles.bodyText}>{products} productos</Text>
                </View>

                <View style={landingStyles.detail}>
                  <MaterialCommunityIcon name="message-text-outline" size={20} color="#DEA76B" />
                  <Text style={landingStyles.bodyText}>{comments} comentario</Text>
                </View>
              </View>

              {/* Contenedor derecha */}
              <View style={landingStyles.detailsContainer}>
                <View style={landingStyles.detail}>
                  <Icon name="cash-outline" size={20} color="#DEA76B" />
                  <Text style={landingStyles.bodyText}>{type}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel from 'react-native-reanimated-carousel';
import { landingStyles } from '../../../theme/landingTheme';
import { Post } from '../interfaces/store.interfaces';

interface Props {
  post: Post;
  isSelected?: boolean;
  onPress: () => void;
}

export const PostCard = ({ post: { likes, type, products, comments }, isSelected = false, onPress }: Props) => {
  const [nameProduct, setNameProduct] = useState<string>('');

  useEffect(() => {
    setNameProduct(products.length === 1 ? 'producto' : 'productos');
  }, [products]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        <View
          style={[landingStyles.cardContent, isSelected && landingStyles.selectedCard]}>
          {/* Carousel de imagenes */}
          <View>
            <Carousel
              loop
              width={120}
              height={140}
              style={{ marginLeft: 10, marginTop: 10    }}
              autoPlay={true}
              data={products}
              scrollAnimationDuration={1000}
              onSnapToItem={index => console.log('current index:', index)}
              renderItem={({ item }) => (
                <Card.Cover
                  key={item.id}
                  source={{ uri: item.image_url }}
                  style={{ width: "90%", height: "90%" }}
                />
              )}
            />
          </View>

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
                  <Text style={landingStyles.bodyText}>
                    {products.length } { nameProduct }
                  </Text>
                </View>

                <View style={landingStyles.detail}>
                  <MaterialCommunityIcon
                    name="message-text-outline"
                    size={20}
                    color="#DEA76B"
                  />
                  <Text style={landingStyles.bodyText}>
                    {comments} comentario
                  </Text>
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

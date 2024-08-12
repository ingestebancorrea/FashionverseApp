import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { landingStyles } from '../../../theme/landingTheme';
import { Product } from '../interfaces/store.interfaces';
import { formatPrice } from '../helpers/formatPrices';

interface Props {
    product: Product;
    isSelected?: boolean;
    onPress?: () => void;
}

export const ProductCard = ({ product: { name, category, brand, color, price, sizes, img }, isSelected = false, onPress }: Props) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Card>
                <View style={[landingStyles.cardContent, isSelected && landingStyles.selectedCard]}>
                    {/* Contenedor de la imagen */}
                    <Card.Cover source={{ uri: img }} style={landingStyles.cover} />

                    {/* Contenedor textos */}
                    <View style={landingStyles.textContainer}>
                        <Text variant="titleLarge" style={landingStyles.cardTitle}>{name}</Text>

                        {/* Detalles de productos */}
                        <View style={landingStyles.productsContainer}>
                            {/* Contenedor izquierda*/}
                            <View style={landingStyles.detailsContainer}>
                                <View style={landingStyles.detail}>
                                    <Icon name="shirt-outline" size={20} color="#DEA76B" />
                                    <Text variant="bodyMedium" style={landingStyles.bodyText}>{category}</Text>
                                </View>

                                <View style={landingStyles.detail}>
                                    <Icon name="pricetag-outline" size={20} color="#DEA76B" />
                                    <Text variant="bodyMedium" style={landingStyles.bodyText}>{brand}</Text>
                                </View>

                                <View style={landingStyles.detail}>
                                    <Icon name="color-fill-outline" size={20} color="#DEA76B" />
                                    <Text variant="bodyMedium" style={landingStyles.bodyText}>{color}</Text>
                                </View>
                            </View>

                            {/* Contenedor derecha */}
                            <View style={landingStyles.detailsContainer}>
                                <View style={landingStyles.detail}>
                                    <Icon name="cash-outline" size={20} color="#DEA76B" />
                                    <Text variant="bodyMedium" style={landingStyles.bodyText}>{formatPrice(Number(price))}</Text>
                                </View>

                                <View style={landingStyles.detail}>
                                    <Icon name="resize-outline" size={20} color="#DEA76B" />
                                    {
                                        sizes.map((size, index) => (
                                            <Text key={index} variant="bodyMedium" style={[landingStyles.bodyText, { marginLeft: 3 }]}>
                                                {size.name}
                                            </Text>
                                        ))
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    );
};

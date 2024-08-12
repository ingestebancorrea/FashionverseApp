import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  storeType: {
    id: number;
    name: string;
    exposition: string;
    duration: string;
    price: number;
  };
  isSelected?: boolean;
  onPress: () => void;
}

export const StoreTypeCard = ({ storeType, isSelected = false, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.cardContainer, isSelected && styles.selectedCard]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{storeType.name}</Text>
        <Icon
          name={storeType.name === 'Gratuita' ? 'store-minus-outline' : 'store-plus-outline'}
          size={100}
          color="#DEA76B"
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Detalles:</Text>
        <View style={styles.detailsList}>
          <Text style={styles.detailItem}>Exposición: {storeType.exposition}</Text>
          <Text style={styles.detailItem}>Duración: {storeType.duration}</Text>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.price}>${storeType.price}</Text>
        <Text style={styles.priceLabel}>Cargo por venta</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 100,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  selectedCard: {
    backgroundColor: '#F2EDE0',
    borderColor: '#F3F3F3',
  },
  headerContainer: {
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  infoContainer: {
    marginBottom: 12,
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
  },
  detailsList: {
    marginTop: 8,
  },
  detailItem: {
    fontSize: 14,
    color: 'black',
  },
  footerContainer: {
    marginTop: 12,
    alignItems: 'flex-start',
  },
  price: {
    fontSize: 24,
    color: 'black',
  },
  priceLabel: {
    fontSize: 14,
    color: 'black',
  },
});

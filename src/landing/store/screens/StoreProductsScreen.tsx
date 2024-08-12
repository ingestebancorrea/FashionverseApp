import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import Pagination from '@cherry-soft/react-native-basic-pagination';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackScreenProps } from '@react-navigation/stack';
import { AddButton  } from '../../components';
import { ProductCard } from '../components/ProductCard';
import { landingStyles } from '../../../theme/landingTheme';
import { CustomButton } from '../../../components';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { useDataFilter } from '../hooks/useDataFilter';
import { ProductsContext } from '../../../context/landing/store/ProductsContextx';

interface Props extends StackScreenProps<any, any> { }

export const StoreProductsScreen = ({ navigation, route }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { loadProducts, products } = useContext(ProductsContext);
  const { paginatedData, page, setPage } = useDataFilter({ data: products });
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleConfirmProduct = () => {
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleCardPress = (id: number) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((prevId) => prevId !== id)
        : [...prevIds, id]
    );
  };

  useEffect(() => {
    loadProducts({ name: searchQuery });
  }, [loadProducts, searchQuery]);

  return (
    <View style={landingStyles.mainContainer}>
      {
        route.params && route.params.origin === 'PostTypes' && (
          <Text style={{...landingStyles.title, marginLeft: 18}}>Selecciona los productos que deseas publicar</Text>
        )
      }

      {/* Búsqueda */}
      <View style={styles.containerParentFilter}>
        <View style={styles.containerFilter}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            loading={false}
            icon={() => <Icon name="search-outline" size={20} />}
            clearIcon={() => (searchQuery ? <Icon name="close-outline" size={20} /> : null)}
          />
        </View>

        <View style={styles.containerButton}>
          {
            route.params && route.params.origin === 'PostTypes' ? (
              <CustomButton label="✓" style={{marginTop: 15}} onEvent={handleConfirmProduct} />
            )
            : (<AddButton navigation={navigation} route={route} label="+" navigateTo="StoreProductScreen" />)
          }
        </View>
      </View>

      {
      products.length > 0 ? (
        <>
          {/* Productos */}
          <View style={styles.containerParentProducts}>
            <FlatList
              data={paginatedData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ProductCard
                  product={item}
                  isSelected={selectedIds.includes(item.id)}
                  onPress={() => handleCardPress(item.id)}
                />
              )}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              contentContainerStyle={{ flexGrow: 1 }}
            />
          </View>

          {/* Paginación */}
          <Pagination
            totalItems={products.length}
            pageSize={5}
            currentPage={page}
            onPageChange={setPage}
            containerStyle={styles.paginationContainer}
            btnStyle={styles.paginationButton}
            showLastPagesButtons
          />
        </>
      ) : (
        <>
          <View style={landingStyles.emptyContainer}>
            <Image
              source={require('../../../assets/add-product.png')}
              style={landingStyles.image}
            />
            <Text style={landingStyles.text}>Agrega un producto</Text>
          </View>
        </>
      )}

      <ConfirmationModal isVisible={isVisible} onClose={handleCloseModal}/>
    </View>
  );
};

const styles = StyleSheet.create({
  containerParentFilter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between', // Añadido para espaciar los elementos horizontalmente
    paddingHorizontal: 10, // Añadido para dar espacio a los lados
    alignItems: 'center', // Alinea los elementos verticalmente al centro
  },
  containerFilter: {
    width: '80%',
  },
  containerButton: {
    width: '15%',
    marginBottom: 10,
  },
  containerParentProducts: {
    flex: 1,
    padding: 10,
  },
  paginationContainer: {
    height: '8%',
  },
  paginationButton: {
    marginTop: 10,
    borderColor: '#DEA76B',
    backgroundColor: '#DEA76B',
  },
});

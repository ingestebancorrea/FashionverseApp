import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import Pagination from '@cherry-soft/react-native-basic-pagination';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackScreenProps } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import { AddButton } from '../../components';
import { ProductCard } from '../components/ProductCard';
import { landingStyles } from '../../../theme/landingTheme';
import { CustomButton, Loading } from '../../../components';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { useDataFilter } from '../hooks/useDataFilter';
import { ProductsContext } from '../../../context/landing/store/ProductsContextx';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PostsContext } from '../../../context/landing/store/PostsContext';
import { postDetailsSchema } from '../schemas/store.schema';
import { usePostResponse } from '../hooks/usePostResponse';

interface Props extends StackScreenProps<any, any> { }

export const StoreProductsScreen = ({ navigation, route }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { loadProducts, products, loading } = useContext(ProductsContext);
  const { addPostDetails, errorMessage } = useContext(PostsContext);
  const { paginatedData, page, setPage } = useDataFilter({ data: products });
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      products: [],
    },
    resolver: yupResolver(postDetailsSchema),
  });
  const [status, setStatus] = useState<number>();
  const { handleSuccessfulMessage, handleErrorMenssage } = usePostResponse();

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

  const onSubmit = async (data) => {
    if (route.params && route.params.postId) {
      const resp = await addPostDetails({
        post_id: route?.params.postId,
        products: data.products.map((id: number) => ({ id })),
      });

      setStatus(resp);
    }
  };

  useEffect(() => {
    if (status === 201) {
      handleCloseModal();
      handleSuccessfulMessage('StorePostsScreen', 'Publicación registrada');
    }
  }, [status]);

  useEffect(() => {
    handleErrorMenssage(errorMessage, 'Error en el registro.', 'StorePostsScreen');
  }, [errorMessage]);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={landingStyles.mainContainer}>
      {
        route.params && route.params.origin === 'PostTypes' && (
          <Text style={{ ...landingStyles.title, marginLeft: 18 }}>Selecciona los productos que deseas publicar</Text>
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
              <CustomButton label="✓" style={{ marginTop: 15 }} onEvent={handleConfirmProduct} buttonDisabled={selectedIds.length === 0 && true} />
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
                  <Controller
                    control={control}
                    name="products"
                    render={({ field: { onChange, value } }) => (
                      <ProductCard
                        product={item}
                        isSelected={value.includes(item.id)}
                        onPress={() => {
                          if (route.params && route.params.origin === 'PostTypes') {
                            onChange(value.includes(item.id)
                              ? value.filter(id => id !== item.id)
                              : [...value, item.id]);
                            handleCardPress(item.id);
                          } else {
                            navigation.navigate('StoreProductScreen',{ productId: item.id.toString() });
                          }
                        }}
                      />
                    )}
                  />
                )}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                contentContainerStyle={{ flexGrow: 1 }}
              />
              {errors.products && <Text style={{ color: 'red', textAlign: 'center' }}>{errors.products.message}</Text>}
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

      <ConfirmationModal isVisible={isVisible} onClose={handleCloseModal} onSubmit={handleSubmit(onSubmit)} />

      <Toast
        position="top"
        bottomOffset={40}
      />
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

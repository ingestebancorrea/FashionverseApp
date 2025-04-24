import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { REACT_APP_PRODUCTS_SERVICE } from '@env';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackScreenProps } from '@react-navigation/stack';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomButton, CustomInput, MultiSelect } from '../../../components';
import { useFetchData } from '../../../hooks/useFetchData';
import { FixedHeaderTable } from '../components/FixedHeaderTable';
import { landingStyles } from '../../../theme/landingTheme';
import { ProductRequest, RowData } from '../interfaces/store.interfaces';
import { useTakePhoto } from '../hooks/useTakePhoto';
import { ProductsContext } from '../../../context/landing/store/ProductsContextx';
import { getImageColors } from '../helpers/getImageColors';
import { productSchema } from '../schemas/store.schema';
import { useShowToastNotification } from '../../../hooks/useShowToastNotification';
import { usePostResponse } from '../hooks/usePostResponse';
import { useFetchDropdownData } from '../hooks/useFetchDropdownData';

interface Props extends StackScreenProps<any, any> { }

export const StoreProductScreen = ({ navigation, route }: Props) => {
  const productId = route?.params?.productId ?? '';
  const { uploadImage, startSaveProduct, errorMessage, loadProductById } = useContext(ProductsContext);
  const { showToast } = useShowToastNotification();
  const { handleSubmit, control, formState: { errors }, setValue } = useForm({
    defaultValues: {
      id: productId,
      name: '',
      category: '',
      brand: '',
      size: '',
      quantity: '',
    },
    resolver: yupResolver(productSchema),
  });
  const { fetchData, data: response } = useFetchData();
  const { tempUri, setTempUri, file, takePhotoFromGallery } = useTakePhoto();
  const { fetchDropdownData, categories, brands } = useFetchDropdownData();
  const [tempProducts, setTempProducts] = useState<RowData[]>([]);
  const [id, setId] = useState(1);
  const [selectedSizeName, setSelectedSizeName] = useState<string>('');
  const { handleErrorMenssage } = usePostResponse();

  const onSizeSelect = (name: string) => {
    setSelectedSizeName(name);
  };

  const onAddRegisterToTable = (data) => {
    const newRow = {
      id: String(Number(id)),
      size: {
        id: +data.size,
        name: selectedSizeName || '',
      },
      available_quantity: +data.quantity || 0,
    };
    setTempProducts(prevProduct => [...prevProduct, newRow]);
    setId(id + 1);
  };

  const onSubmit = async (data) => {
    Keyboard.dismiss();

    const resp = file && await uploadImage(file, {
      category_id: data.category,
      brand_id: data.brand,
    });

    if (!file) {
      showToast('error', 'Error', 'Debes subir una imagen para tu producto');
    }

    if (resp) {
      const { primary = 'white' } = await getImageColors(resp[0]?.url);

      const objCategory: ProductRequest = {
        name: data.name,
        category_id: +data.category,
        brand_id: +data.brand,
        price: null,
        color: primary,
        inventories: tempProducts.map(({ size, available_quantity }) => {
          return {
            size_id: size.id,
            available_quantity,
          };
        }),
        image_url: resp[0]?.url,
      };

      startSaveProduct(objCategory);
      navigation.navigate('SellConditionsScreen');
    }
  };

  useEffect(() => {
    handleErrorMenssage(errorMessage, 'Error en el cargue de imagen.', 'StoreProductsScreen');
  }, [errorMessage]);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (productId.length === 0) { return; }
    const product = await loadProductById(productId);
    if (product) {
      setValue('name', product.name);
      setValue('category', product.category.id.toString());
      setValue('brand', product.brand.id.toString());
      setTempUri(product.image_url!);

      await fetchDropdownData();
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={true} style={landingStyles.mainContainer}>
      <Text style={{ ...styles.title, color: 'black' }}>
        Completa la información de tu producto
      </Text>

      {/* Horizontal ScrollView for images */}
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={takePhotoFromGallery}
            style={styles.addPhotoButton}>
            <Icon name="camera-outline" size={20} />
            <Text>Agrega tu foto aqui</Text>
          </TouchableOpacity>
        </View>

        {tempUri && (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: tempUri }} style={styles.image} />
          </View>
        )}
      </ScrollView>

      {/* Formulario */}
      <View>
        <View style={{ marginHorizontal: 4 }}>
          <Controller
            defaultValue=""
            name="name"
            control={control}
            render={({ field: { onChange, value: inputValue } }) => (
              <CustomInput
                placeholder="Nombre *"
                autoCorrect={false}
                value={inputValue || undefined}
                onChange={value => onChange(value, 'name')}
                autoCapitalize="words"
              />
            )}
          />
          {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '48%', marginLeft: 5 }}>
            <Controller
              defaultValue=""
              name="category"
              control={control}
              render={({ field: { onChange, value: inputValue } }) => (
                <MultiSelect
                  value={categories.find(cat => cat.id.toString() === inputValue)}
                  defaultButtonText="Categoria"
                  onFocus={async () => await fetchData(REACT_APP_PRODUCTS_SERVICE, '/categories')}
                  data={categories.length !== 0 ? categories : response}
                  onSelect={selectedItem => {
                    if (selectedItem !== undefined) {
                      onChange(selectedItem.id, 'category');
                    }
                  }}
                  disabled={tempProducts.length > 0 && true}
                />
              )}
            />
            {errors.category && <Text style={{ color: 'red' }}>{errors.category.message}</Text>}
          </View>

          <View style={{ width: '48%', marginRight: 5 }}>
            <Controller
              defaultValue=""
              name="brand"
              control={control}
              render={({ field: { onChange, value: inputValue } }) => (
                <MultiSelect
                  value={brands.find(brand => brand.id.toString() === inputValue)}
                  defaultButtonText="Marca"
                  onFocus={async () => await fetchData(REACT_APP_PRODUCTS_SERVICE, '/brands')}
                  data={brands.length !== 0 ? brands : response}
                  onSelect={selectedItem => {
                    if (selectedItem !== undefined) {
                      onChange(selectedItem.id, 'brand');
                    }
                  }}
                  disabled={tempProducts.length > 0 && true}
                />
              )}
            />
            {errors.brand && <Text style={{ color: 'red' }}>{errors.brand.message}</Text>}
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '48%', marginLeft: 5 }}>
            <Controller
              defaultValue=""
              name="size"
              control={control}
              render={({ field: { onChange, value: inputValue } }) => (
                <MultiSelect
                  defaultValue={inputValue}
                  defaultButtonText="Talla"
                  onFocus={async () => await fetchData(REACT_APP_PRODUCTS_SERVICE, '/sizes')}
                  data={response}
                  onSelect={selectedItem => {
                    if (selectedItem !== undefined) {
                      onChange(selectedItem.id, 'size');
                      onSizeSelect(selectedItem.name);
                    }
                  }}
                />
              )}
            />
            {errors.size && <Text style={{ color: 'red' }}>{errors.size.message}</Text>}
          </View>

          <View style={{ width: '48%', marginRight: 5, marginTop: 14 }}>
            <Controller
              defaultValue=""
              name="quantity"
              control={control}
              render={({ field: { onChange, value: inputValue } }) => (
                <CustomInput
                  placeholder="Cantidad *"
                  keyboardType="phone-pad"
                  value={inputValue}
                  onChange={value => onChange(value, 'quantity')}
                />
              )}
            />
            {errors.quantity && <Text style={{ color: 'red' }}>{errors.quantity.message}</Text>}
          </View>
        </View>
      </View>

      {/* Botón Agregar */}
      <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
        <CustomButton label="Agregar" style={{ width: "50%", height: 60 }} onEvent={handleSubmit(onAddRegisterToTable)} />
      </View>

      {/* Tabla */}
      <FixedHeaderTable rows={tempProducts} />

      {/* Botones */}
      <View style={landingStyles.buttonContainer}>
        <CustomButton label="Confirmar" style={landingStyles.button} onEvent={handleSubmit(onSubmit)} buttonDisabled={tempProducts.length === 0 && true} />

        <TouchableOpacity onPress={() => navigation.navigate('StoreProductsScreen')}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  scrollViewContainer: {
    flexDirection: 'row',
    backgroundColor: 'red',
  },
  imageContainer: {
    height: 120,
    width: 140,
    marginLeft: 6,
  },
  addPhotoButton: {
    backgroundColor: '#D3D3D3',
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderRadius: 4,
  },
  imageWrapper: {
    height: 110,
    width: 140,
    marginLeft: 6,
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    borderColor: '#f0f0f0',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Ensure the image scales properly
  },
});

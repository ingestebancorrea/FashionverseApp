import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import { CustomButton, CustomInput } from '../../../components';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { landingStyles } from '../../../theme/landingTheme';
import { yupResolver } from '@hookform/resolvers/yup';
import { productPriceSchema } from '../schemas/store.schema';
import { ProductsContext } from '../../../context/landing/store/ProductsContextx';
import Toast from 'react-native-toast-message';
import { usePostResponse } from '../hooks/usePostResponse';

export const SellConditionsScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { addProduct, errorMessage } = useContext(ProductsContext);
  const [status, setStatus] = useState<number>();
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      price: '',
    },
    resolver: yupResolver(productPriceSchema),
  });
  const { handleSuccessfulMessage, handleErrorMenssage } = usePostResponse();

  const onSubmit = async (data) => {
    Keyboard.dismiss();
    const resp = await addProduct(+data.price);
    setStatus(resp);
  };

  useEffect(() => {
    if ( status === 201 ) {
      handleSuccessfulMessage('StoreProductsScreen','Producto registrado');
    }
  }, [status]);

  useEffect(() => {
    handleErrorMenssage(errorMessage,'Error en el registro.','StoreProductsScreen');
  }, [errorMessage]);

  return (
    <ScrollView showsVerticalScrollIndicator={true} style={landingStyles.mainContainer}>
      <Text style={landingStyles.title}>
        Condiciones de venta
      </Text>

      <View style={styles.formContainer}>
        <Controller
          defaultValue=""
          name="price"
          control={control}
          render={({ field: { onChange, value: inputValue } }) => (
            <CustomInput
              placeholder="Precio *"
              keyboardType="phone-pad"
              value={inputValue}
              onChange={value => onChange(value, 'price')}
            />
          )}
        />
        {errors.price && <Text style={{ color: 'red' }}>{errors.price.message}</Text>}
      </View>

      <View style={{ height: 100 }} />

      <View style={styles.textContainer}>
        <Text style={styles.text}>Ir a </Text>

        <TouchableOpacity onPress={() => navigation.navigate('ProductsScreen')}>
          <Text style={[styles.text, landingStyles.linkText]}>simulador de costos</Text>
        </TouchableOpacity>

        <Text style={styles.text}>para estimar cuanto dinero recibirás por cada venta.</Text>
      </View>

      <View style={{ height: 380 }} />

      {/* Botones */}
      <View style={landingStyles.buttonContainer}>
        <CustomButton label="Registrar" style={landingStyles.button} onEvent={handleSubmit(onSubmit)} />

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
  formContainer: {
    width: '48%',
    marginRight: 5,
    marginTop: 14,
    marginLeft: 4,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 18,
    color: 'black',
    marginHorizontal: 10,
  },
});

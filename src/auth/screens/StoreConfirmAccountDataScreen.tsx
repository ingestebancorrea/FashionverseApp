import React, { useContext, useEffect } from 'react';
import { Alert, Keyboard, Text, View } from 'react-native';
import { AuthLayout } from '../layout/AuthLayout';
import { CustomButton, CustomInput, CustomRadioButton, Loading, MultiSelect } from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackScreenProps } from '@react-navigation/stack';
import { useForm, Controller } from 'react-hook-form';
import { useAxiosPost } from '../../hooks/usePostAxios';
import { useFetchData } from '../../hooks/useFetchData';
import { AuthContext } from '../../context/auth/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { storeConfirmData } from '../schemas/auth.schemas';
import { REACT_APP_AUTH_SERVICE } from '@env';

interface Props extends StackScreenProps<any, any> { }

export const StoreConfirmAccountDataScreen = ({ navigation }: Props) => {
  const { finishRegister } = useContext(AuthContext);
  const { handleSubmit, control, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      cellphone: '',
      storeType: '',
      department: '',
      city: '',
      neighborhood: '',
      street: '',
      streetNumber: '',
      otherReferences: '',
      terms: false,
      politics: false,
    },
    resolver: yupResolver(storeConfirmData),
  });
  const { isLoading, error, setError, postData } = useAxiosPost();
  const { fetchData, data: response } = useFetchData();
  const department = watch('department');

  const onSumbit = async (data) => {
    Keyboard.dismiss();

    const body = {
      name: data.name,
      cellphone: data.cellphone,
      id_storetype: parseInt(data.storeType, 10),
      id_department: parseInt(data.department, 10),
      id_city: parseInt(data.city, 10),
      neighborhood: data.neighborhood,
      street: data.street,
      house_number: data.streetNumber,
      other_references: data.otherReferences || null,
    };

    await postData(REACT_APP_AUTH_SERVICE,'/stores', body);
    response && finishRegister();
  };

  useEffect(() => {
    if (!error) {return;}

    Alert.alert('Error en la inserción.', error, [{
      text: 'Ok',
      onPress: () => {
        setError(null);
        navigation.replace('LoginScreen');
      },
    }]);
  }, [error]);

  if (isLoading) { return (<Loading />); }

  return (
    <AuthLayout>
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            name="reader-outline"
            size={24}
            color="#DEA76B"
          />

          <Text style={{ fontSize: 20, color: "black", marginLeft: 5 }}>Datos básicos</Text>
        </View>

        <Controller
          defaultValue=""
          name="name"
          control={control}
          render={({ field: { onChange, value: inputValue } }) => (
            <CustomInput
              placeholder="Nombre *"
              autoCorrect={false}
              value={inputValue}
              onChange={(value) => onChange(value, 'name')}
              autoCapitalize="words"
            />
          )}
        />
        {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}

        <Controller
          defaultValue=""
          name="cellphone"
          control={control}
          render={({ field: { onChange, value: inputValue } }) => (
            <CustomInput
              placeholder="Teléfono *"
              keyboardType="phone-pad"
              value={inputValue}
              onChange={(value) => onChange(value, 'cellphone')}
            />
          )}
        />
        {errors.cellphone && <Text style={{ color: 'red' }}>{errors.cellphone.message}</Text>}

        <Controller
          defaultValue=""
          name="storeType"
          control={control}
          render={({ field: { onChange, value: inputValue } }) => (
            <MultiSelect
              defaultValue={inputValue}
              defaultButtonText="Tipo de tienda"
              data={response}
              onFocus={async () => await fetchData(REACT_APP_AUTH_SERVICE,'/storestype')}
              onSelect={(selectedItem) => {
                if (selectedItem !== undefined) {
                  onChange(selectedItem.id, 'storeType');
                }
              }}
            />
          )}
        />
        {errors.storeType && <Text style={{ color: 'red' }}>{errors.storeType.message}</Text>}
      </View>

      <View style={{ marginTop: 40 }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            name="location-outline"
            size={24}
            color="#DEA76B"
          />

          <Text style={{ fontSize: 20, color: "black", marginLeft: 5 }}>Ubicación</Text>
        </View>

        <Controller
          defaultValue=""
          name="department"
          control={control}
          render={({ field: { onChange, value: inputValue } }) => (
            <MultiSelect
              defaultValue={inputValue}
              defaultButtonText="Departamento"
              data={response}
              onFocus={async () => await fetchData(REACT_APP_AUTH_SERVICE,'/departments')}
              onSelect={(selectedItem) => {
                if (selectedItem !== undefined) {
                  onChange(selectedItem.id, 'department');
                }
              }}
            />
          )}
        />
        {errors.department && <Text style={{ color: 'red' }}>{errors.department.message}</Text>}

        <Controller
          defaultValue=""
          name="city"
          control={control}
          render={({ field: { onChange, value: inputValue } }) => (
            <MultiSelect
              defaultValue={inputValue}
              defaultButtonText="Ciudad"
              data={response}
              onFocus={async () => await fetchData(REACT_APP_AUTH_SERVICE,`/cities/department/${department}`)}
              onSelect={(selectedItem) => {
                if (selectedItem !== undefined) {
                  onChange(selectedItem.id, 'city');
                }
              }}
            />
          )}
        />
        {errors.city && <Text style={{ color: 'red' }}>{errors.city.message}</Text>}

        <Controller
          defaultValue=""
          name="neighborhood"
          control={control}
          render={({ field: { onChange, value: inputValue } }) => (
            <CustomInput
              placeholder="Barrio *"
              autoCorrect={false}
              value={inputValue}
              onChange={(value) => onChange(value, 'neighborhood')}
              autoCapitalize="words"
            />
          )}
        />
        {errors.neighborhood && <Text style={{ color: 'red' }}>{errors.neighborhood.message}</Text>}

        <Controller
          defaultValue=""
          name="street"
          control={control}
          render={({ field: { onChange, value: inputValue } }) => (
            <CustomInput
              placeholder="Calle *"
              autoCorrect={false}
              value={inputValue}
              onChange={(value) => onChange(value, 'street')}
              autoCapitalize="words"
            />
          )}
        />
        {errors.street && <Text style={{ color: 'red' }}>{errors.street.message}</Text>}

        <Controller
          defaultValue=""
          name="streetNumber"
          control={control}
          render={({ field: { onChange, value: inputValue } }) => (
            <CustomInput
              placeholder="Número *"
              keyboardType="phone-pad"
              value={inputValue}
              onChange={(value) => onChange(value, 'streetNumber')}
            />
          )}
        />
        {errors.streetNumber && <Text style={{ color: 'red' }}>{errors.streetNumber.message}</Text>}

        <Controller
          defaultValue=""
          name="otherReferences"
          control={control}
          render={({ field: { onChange, value: inputValue } }) => (
            <CustomInput
              placeholder="Otras referencias"
              autoCorrect={false}
              value={inputValue || undefined}
              onChange={(value) => onChange(value, 'street')}
              autoCapitalize="words"
            />
          )}
        />
        {errors.otherReferences && <Text style={{ color: 'red' }}>{errors.otherReferences.message}</Text>}

        {/* Terminos y condiciones */}
        <View style={{ marginTop: 45 }}>
          <Controller
            name="terms"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomRadioButton
                text="Acepto los términos y condiciones."
                value={value}
                onChange={(newValue) => {
                  onChange(newValue);
                }}
              />
            )}
          />
          {errors.terms && <Text style={{ color: 'red' }}>{errors.terms.message}</Text>}

          <Controller
            name="politics"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomRadioButton
                text="Acepto las políticas de tratamiento de datos."
                value={value}
                onChange={(newValue) => {
                  onChange(newValue);
                }}
              />
            )}
          />
          {errors.politics && <Text style={{ color: 'red' }}>{errors.politics.message}</Text>}
        </View>

        {/* Boton Finalizar Registro */}
        <View style={{ marginBottom: 20 }}>
          <CustomButton label="FINALIZAR REGISTRO" onEvent={handleSubmit(onSumbit)} style={{ paddingTop: 15 }} />
        </View>

      </View>
    </AuthLayout>
  );
};

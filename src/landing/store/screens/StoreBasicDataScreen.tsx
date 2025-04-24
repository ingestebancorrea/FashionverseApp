import React from 'react';
import { View, Text } from 'react-native';
import { ItemSeparator, Profile } from '../components';
import { Controller, useForm } from 'react-hook-form';
import { REACT_APP_AUTH_SERVICE } from '@env';
import { CustomButton, CustomInput, MultiSelect } from '../../../components';
import { landingStyles } from '../../../theme/landingTheme';
import { useFetchData } from '../../../hooks/useFetchData';
import { ScrollView } from 'react-native-gesture-handler';

export const StoreBasicDataScreen = () => {
  const { handleSubmit, control, formState: { errors } } = useForm({
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
    },
  });
  const { fetchData, data: response } = useFetchData();

  const onSumbit = () => {

  };

  return (
    <ScrollView style={landingStyles.mainContainer}>
      <Profile />

      <ItemSeparator />

      <View style={{ marginHorizontal: 20 }}>
        <Text style={{...landingStyles.title, textAlign: 'center'}}>Datos básicos</Text>

        <Controller
          defaultValue=""
          name="name"
          control={control}
          render={({ field: { onChange, value: inputValue } }) => (
            <CustomInput
              placeholder="Nombre *"
              autoCorrect={false}
              value={inputValue}
              onChange={value => onChange(value, 'name')}
              autoCapitalize="words"
            />
          )}
        />

        <Controller
          defaultValue=""
          name="cellphone"
          control={control}
          render={({ field: { onChange, value: inputValue } }) => (
            <CustomInput
              placeholder="Teléfono *"
              keyboardType="phone-pad"
              value={inputValue}
              onChange={value => onChange(value, 'cellphone')}
            />
          )}
        />

        <Controller
          defaultValue=""
          name="storeType"
          control={control}
          render={({ field: { onChange, value: inputValue } }) => (
            <MultiSelect
              defaultValue={inputValue}
              defaultButtonText="Tipo de tienda"
              data={response}
              onFocus={async () =>
                await fetchData(REACT_APP_AUTH_SERVICE, '/storestype')
              }
              onSelect={selectedItem => {
                if (selectedItem !== undefined) {
                  onChange(selectedItem.id, 'storeType');
                }
              }}
            />
          )}
        />

        <Text style={{...landingStyles.title, textAlign: 'center'}}>Ubicación</Text>

        <Controller
          defaultValue=""
          name="department"
          control={control}
          render={({ field: { onChange, value: inputValue } }) => (
            <MultiSelect
              defaultValue={inputValue}
              defaultButtonText="Departamento"
              data={response}
              onFocus={async () =>
                await fetchData(REACT_APP_AUTH_SERVICE, '/departments')
              }
              onSelect={selectedItem => {
                if (selectedItem !== undefined) {
                  onChange(selectedItem.id, 'department');
                }
              }}
            />
          )}
        />

        <Controller
          defaultValue=""
          name="neighborhood"
          control={control}
          render={({ field: { onChange, value: inputValue } }) => (
            <CustomInput
              placeholder="Barrio *"
              autoCorrect={false}
              value={inputValue}
              onChange={value => onChange(value, 'neighborhood')}
              autoCapitalize="words"
            />
          )}
        />

        <Controller
          defaultValue=""
          name="street"
          control={control}
          render={({ field: { onChange, value: inputValue } }) => (
            <CustomInput
              placeholder="Calle *"
              autoCorrect={false}
              value={inputValue}
              onChange={value => onChange(value, 'street')}
              autoCapitalize="words"
            />
          )}
        />

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

        <View style={{ marginBottom: 20 }}>
          <CustomButton label="Guardar cambios" onEvent={handleSubmit(onSumbit)} style={{ paddingTop: 15 }} />
        </View>
      </View>
    </ScrollView >
  );
};

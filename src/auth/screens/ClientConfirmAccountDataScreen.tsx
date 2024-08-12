import React, { useContext, useEffect } from 'react';
import { Alert, Keyboard, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthLayout } from '../layout/AuthLayout';
import { CustomButton, CustomInput, MultiSelect, DatePicker, CustomRadioButton, Loading } from '../../components';
import { AuthContext } from '../../context/auth/AuthContext';
import { useFetchData } from '../../hooks/useFetchData';
import { useAxiosPost } from '../../hooks/usePostAxios';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { clientConfirmData } from '../schemas/auth.schemas';
import { REACT_APP_AUTH_SERVICE } from '@env';

interface Props extends StackScreenProps<any, any> { }

export const ClientConfirmAccountDataScreen = ({ navigation, route }: Props) => {
    const { user } = useContext(AuthContext);
    const { isLoading, error, setError, postData } = useAxiosPost();
    const { fetchData, data: response } = useFetchData();
    const fullName = user?.displayName || '';
    const [firstName, ...lastNameArray] = fullName.split(' ');
    const lastNameSaved = lastNameArray.join(' '); // Convertir el array de apellidos en una cadena
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            name: firstName,
            lastName: lastNameSaved,
            documentType: '',
            documentNumber: '',
            dateBirth: new Date(),
            terms: false,
            politics: false,
        },
        resolver: yupResolver(clientConfirmData),
    });

    const onSubmit = async (data) => {
        Keyboard.dismiss();

        const body = {
            name: firstName,
            lastname: lastNameSaved,
            id_documenttype: data.documentType,
            identification_number: data.documentNumber,
            birth_date: data.dateBirth,
        };

        await postData(REACT_APP_AUTH_SERVICE,'/clients', body);
        data && navigation.replace('PreferencesScreen');
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
        <AuthLayout title="Confirma tus datos">
            {route.params && route.params.authenticationMethod === 'provider' && (
                <>
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
                        name="lastName"
                        control={control}
                        render={({ field: { onChange, value: inputValue } }) => (
                            <CustomInput
                                placeholder="Apellido *"
                                autoCorrect={false}
                                value={inputValue}
                                onChange={(value) => onChange(value, 'lastName')}
                                autoCapitalize="words"
                            />
                        )}
                    />
                    {errors.lastName && <Text style={{ color: 'red' }}>{errors.lastName.message}</Text>}
                </>
            )}

            <Controller
                defaultValue=""
                name="documentType"
                control={control}
                render={({ field: { onChange, value: inputValue } }) => (
                    <MultiSelect
                        defaultValue={inputValue}
                        defaultButtonText="Tipo documento de identidad"
                        onFocus={async () => await fetchData(REACT_APP_AUTH_SERVICE,'/documenttypes')}
                        data={response}
                        onSelect={(selectedItem) => {
                            if (selectedItem !== undefined) {
                                onChange(selectedItem.id, 'documentType');
                            }
                        }}
                    />
                )}
            />
            {errors.documentType && <Text style={{ color: 'red' }}>{errors.documentType.message}</Text>}

            <Controller
                defaultValue=""
                name="documentNumber"
                control={control}
                render={({ field: { onChange, value: inputValue } }) => (
                    <CustomInput
                        placeholder="Número de identidad *"
                        keyboardType="phone-pad"
                        value={inputValue}
                        onChange={(value) => onChange(value, 'documentNumber')}
                    />
                )}
            />
            {errors.documentNumber && <Text style={{ color: 'red' }}>{errors.documentNumber.message}</Text>}

            <Controller
                defaultValue={new Date()}
                name="dateBirth"
                control={control}
                render={({ field: { value: inputValue } }) => (
                    <DatePicker
                        text="Fecha de nacimiento"
                        value={inputValue}
                    />
                )}
            />
            {errors.dateBirth && <Text style={{ color: 'red' }}>{errors.dateBirth.message}</Text>}

            {/* Terminos y condiciones */}
            <View style={{ marginTop: 45 }}>
                <Controller
                    defaultValue={false}
                    name="terms"
                    control={control}
                    render={({ field: { onChange, value: inputValue } }) => (
                        <CustomRadioButton
                            text="Acepto los términos y condiciones."
                            value={inputValue}
                            onChange={(value) => onChange(value, 'terms')}
                        />
                    )}
                />
                {errors.terms && <Text style={{ color: 'red' }}>{errors.terms.message}</Text>}

                <Controller
                    defaultValue={false}
                    name="terms"
                    control={control}
                    render={({ field: { onChange, value: inputValue } }) => (
                        <CustomRadioButton
                            text="Acepto las políticas de tratamiento de datos."
                            value={inputValue}
                            onChange={(value) => onChange(value, 'politics')}
                        />
                    )}
                />
                {errors.politics && <Text style={{ color: 'red' }}>{errors.politics.message}</Text>}
            </View>

            {/* Boton Finalizar Registro */}
            <CustomButton label="FINALIZAR REGISTRO" onEvent={handleSubmit(onSubmit)} style={{ paddingTop: 15 }} />
        </AuthLayout>
    );
};

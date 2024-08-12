import React, { useContext, useEffect, useState } from 'react';
import { Alert, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { WEB_CLIENT_ID } from '@env';
import { useForm, Controller } from 'react-hook-form';
import { AuthLayout } from '../layout/AuthLayout';
import { GoogleButton, FacebookButton } from '../components';
import { CustomInput, CustomButton, Loading } from '../../components';
import { loginStyles } from '../../theme/loginTheme';
import { AuthContext } from '../../context/auth/AuthContext';
import { LoginProvider, Roles } from '../enums/auth.enums';
import { CustomPassword } from '../components/CustomPassword';
import { RegisterData } from '../interfaces/auth.interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema, signUpSchemaWithOutName } from '../schemas/auth.schemas';

interface Props extends StackScreenProps<any, any> { }

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  offlineAccess: false,
});

export const SignUpScreen = ({ navigation }: Props) => {
  const { signUpWithProvider, signUp, role, user, isLoading, errorMessage, removeError } = useContext(AuthContext);
  const [authMethod, setAuthMethod] = useState('');
  const defaultValues = role === Roles.CL
    ? { name: '', lastName: '', email: '', password: '', confirmPassword: '' }
    : { email: '', password: '', confirmPassword: '' };

  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(role === Roles.CL ? signUpSchema : signUpSchemaWithOutName),
  });

  const signUpWithFacebook = async () => {
    try {
      const login = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (login.isCancelled) {
        console.log('Login Cancelado');
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        signUpWithProvider({
          token: data && data.accessToken,
          loginprovider: LoginProvider.FTV,
          alias_role: role,
        });
        setAuthMethod('provider');
      }
    } catch (error) {
      console.log('Error no login ', error);
    }
  };

  const signUpWithGoogle = () => {
    GoogleSignin.hasPlayServices().then((hasPlayService) => {
      if (hasPlayService) {
        GoogleSignin.signIn().then(async (userInfo) => {
          const { idToken } = userInfo;
          signUpWithProvider({
            token: idToken,
            loginprovider: LoginProvider.GTV,
            alias_role: role,
          });
          setAuthMethod('provider');
        }).catch((e) => {
          console.log('ERROR IS: ' + JSON.stringify(e));
        });
      }
    }).catch((e) => {
      console.log('ERROR: ' + JSON.stringify(e));
    });
  };

  const onSubmit = (data) => {
    Keyboard.dismiss();// Ocultar teclado

    if (data.password !== data.confirmPassword) {
      Alert.alert('Error', 'La contraseña y la confirmación de contraseña no coinciden.');
      return;
    }

    const signUpData: RegisterData = {
      alias_role: role!,
      username: data.email,
      password: data.password,
    };

    if (data.name && data.lastName) {
      signUpData.name = data.name;
      signUpData.lastname = data.lastName;
    }

    console.log('signUpData',signUpData);
    signUp(signUpData);
    setAuthMethod('normal');
  };

  useEffect(() => {
    if (user) {
      if (role && role === Roles.ST) {
        navigation.replace('StoreConfirmAccountDataScreen');
      } else {
        if (authMethod === 'normal') {
          navigation.replace('ClientConfirmAccountDataScreen', { authenticationMethod: 'normal' });
        } else {
          navigation.replace('ClientConfirmAccountDataScreen', { authenticationMethod: 'provider' });
        }
      }
    }
  }, [authMethod, navigation, role, user]);

  useEffect(() => {
    if (!errorMessage) return;

    Alert.alert('Registro incorrecto', errorMessage, [{
      text: 'Ok',
      onPress: removeError,// Limpiar el error
    }]);
  }, [errorMessage]);

  if (isLoading) { return (<Loading />); }

  return (
    <AuthLayout>
      <FacebookButton label="REGISTRATE CON FACEBOOK" onEvent={signUpWithFacebook} />

      <GoogleButton label="REGISTRATE CON GOOGLE" onEvent={signUpWithGoogle} />

      <View style={{ alignItems: 'center', marginVertical: 12 }}>
        <Text style={{ fontSize: 20, color: 'black' }}>or</Text>
      </View>

      <View>
        {role && role === Roles.CL && (
          <>
            <Controller
              defaultValue=""
              name="name"
              control={control}
              render={({ field: { onChange, value: inputValue } }) => (
                <CustomInput
                  placeholder="Nombre *"
                  autoCorrect={false}
                  value={inputValue || undefined}
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
                  value={inputValue || undefined}
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
          name="email"
          control={control}
          render={({ field: { onChange, value: inputValue } }) => (
            <CustomInput
              placeholder="Correo electrónico *"
              keyboardType="email-address"
              value={inputValue}
              onChange={(value) => onChange(value, 'email')}
            />
          )}
        />
        {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}

        <Controller
          defaultValue=""
          name="password"
          control={control}
          render={({ field: { onChange, value: inputValue } }) => (
            <CustomPassword
              placeholder="Contraseña *"
              value={inputValue}
              onChange={(value) => onChange(value, 'password')}
            />
          )}
        />
        {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}

        <Controller
          defaultValue=""
          name="confirmPassword"
          control={control}
          render={({ field: { onChange, value: inputValue } }) => (
            <CustomPassword
              placeholder="Confirmar Contraseña *"
              value={inputValue}
              onChange={(value) => onChange(value, 'confirmPassword')}
            />
          )}
        />
        {errors.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword.message}</Text>}

        {/* Boton Crear Cuenta */}
        <CustomButton label="CREAR CUENTA" onEvent={handleSubmit(onSubmit)} style={{ paddingTop: 15 }} />

        {/* Login */}
        <View style={loginStyles.newUserContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.replace('LoginScreen')} // Destruye la pantalla anterior
          >
            <Text style={loginStyles.buttonText}>¿Ya tienes cuenta? Ingresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
};

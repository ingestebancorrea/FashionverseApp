import React, { useContext, useEffect } from 'react';
import { Alert, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { WEB_CLIENT_ID } from '@env';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomInput, CustomButton, Loading } from '../../components';
import { loginStyles } from '../../theme/loginTheme';
import { AuthLayout } from '../layout/AuthLayout';
import { FacebookButton, GoogleButton } from '../components';
import { LoginProvider } from '../enums/auth.enums';
import { AuthContext } from '../../context/auth/AuthContext';
import { CustomPassword } from '../components/CustomPassword';
import { Controller, useForm } from 'react-hook-form';
import { loginSchema } from '../schemas/auth.schemas';

interface Props extends StackScreenProps<any, any> { }

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  offlineAccess: false,
});

export const LoginScreen = ({ navigation }: Props) => {
  const { signInWithProvider, signIn, errorMessage, removeError, isLoading } = useContext(AuthContext);
  const { handleSubmit, control, formState: { errors }  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const loginWithFacebook = async () => {
    try {
      const login = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (login.isCancelled) {
        console.log('Login Cancelado');
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        signInWithProvider({
          token: data && data.accessToken,
          loginprovider: LoginProvider.FTV,
        });
      }
    } catch (error) {
      console.log('Error no login ', error);
    }
  };

  const loginWithGoogle = () => {
    GoogleSignin.hasPlayServices().then((hasPlayService) => {
      if (hasPlayService) {
        GoogleSignin.signIn().then((userInfo) => {
          const { idToken } = userInfo;

          signInWithProvider({
            token: idToken && idToken,
            loginprovider: LoginProvider.GTV,
          });
        }).catch((e) => {
          console.log('ERROR IS: ' + JSON.stringify(e));
        });
      }
    }).catch((e) => {
      console.log('ERROR: ' + JSON.stringify(e));
    });
  };

  const onSubmit = (data: { email: string; password: string; }) => {
    Keyboard.dismiss();
    signIn({ username: data.email, password: data.password });
  };

  useEffect(() => {
    if (!errorMessage) return;
    Alert.alert('Login incorrecto', errorMessage, [{
      text: 'Ok',
      onPress: removeError,// Limpiar el error
    }]);
  }, [errorMessage]);

  if (isLoading) { return (<Loading />); }

  return (
    <>
      <AuthLayout>
        <FacebookButton label="INICIA SESIÓN CON FACEBOOK" onEvent={loginWithFacebook} />

        <GoogleButton label="INICIA SESIÓN CON GOOGLE" onEvent={loginWithGoogle} />

        <View style={{ alignItems: 'center', marginVertical: 15 }}>
          <Text style={{ fontSize: 20, color: 'black' }}>or</Text>
        </View>

        <View>
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

          {/* Boton Login */}
          <CustomButton label="INICIAR SESIÓN" onEvent={handleSubmit(onSubmit)} style={{ paddingTop: 15 }} />

          {/* Crear una nueva cuenta */}
          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace('RolesScreen')} // Destruye la pantalla anterior
            >
              <Text style={loginStyles.buttonText}>¿No tienes cuenta? Registrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </AuthLayout>
    </>
  );
};

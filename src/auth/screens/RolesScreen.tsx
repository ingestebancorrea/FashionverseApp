import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { loginStyles } from '../../theme/loginTheme';
import { NavigationButton } from '../../components/NavigationButton';
import { AuthLayout } from '../layout/AuthLayout';
import { Roles } from '../enums/auth.enums';

interface Props extends StackScreenProps<any, any> { }

export const RolesScreen = ({ navigation, route }: Props) => {
  return (
    <>
      <AuthLayout title="!Empieza con una cuenta gratuita!" parragraph="Únete a la comunidad y comienza a publicar o probar prendas de forma virtual hoy mismo.">
        <View style={styles.roleContainer}>
          <View style={styles.headerRoles}>
            <Text style={{
              ...styles.paragraph,
              color: 'white',
            }}>
              Crea una cuenta gratis
            </Text>
          </View>

          <View style={{ position: 'relative' }}>
            {/* Image */}
            <Image
              source={require('../../assets/client.png')}
              style={styles.image}
            />
            {/* Button */}
            <View style={styles.roleButtonContainer}>
              <NavigationButton navigation={navigation} route={route} title="CLIENTE" navigateTo="SignUpScreen" role={Roles.CL} buttonStyle={{
                backgroundColor: '#F2EDE0',
                borderColor: '#F2EDE0',
              }} textColor="#DEA76B" />
            </View>
          </View>
        </View>

        <View style={styles.roleContainer}>
          <View style={{ position: 'relative' }}>
            {/* Image */}
            <Image
              source={require('../../assets/store.png')}
              style={styles.image}
            />
            {/* Button */}
            <View style={styles.roleButtonContainer}>
              <NavigationButton navigation={navigation} route={route} title="TIENDA" navigateTo="SignUpScreen" role={Roles.ST} buttonStyle={{
                backgroundColor: '#F2EDE0',
                borderColor: '#F2EDE0',
              }} textColor="#DEA76B"/>
            </View>
          </View>
        </View>

        {/* Login */}
        <View style={loginStyles.newUserContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.replace('LoginScreen')} // Destruye la pantalla anterior
          >
            <Text style={loginStyles.buttonText}>¿Ya tienes cuenta? Ingresar</Text>
          </TouchableOpacity>
        </View>
      </AuthLayout>
    </>
  );
};

const styles = StyleSheet.create({
  headerRoles: {
    backgroundColor: '#DEA76B',
    width: 290,
  },
  roleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 290,
    height: 200,
  },
  roleButtonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});

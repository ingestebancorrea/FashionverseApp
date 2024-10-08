import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/auth/AuthContext';
import { LoginScreen, SignUpScreen, RolesScreen, PreferencesScreen, ClientConfirmAccountDataScreen, StoreConfirmAccountDataScreen } from '../auth/screens';
import { ClientPostsScreen } from '../landing/client/screens/ClientPostsScreen';
import { DrawerNavigator } from './Drawer';

const Stack = createStackNavigator();

export const Navigator = () => {
  const { status, user } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      {status !== 'authenticated' ? (
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RolesScreen" component={RolesScreen} />
          <Stack.Screen name="PreferencesScreen" component={PreferencesScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="ClientConfirmAccountDataScreen" component={ClientConfirmAccountDataScreen} />
          <Stack.Screen name="StoreConfirmAccountDataScreen" component={StoreConfirmAccountDataScreen} />
        </>
      ) : (
        <>
          {user && user.role.alias === 'STORE' && (
            <Stack.Screen name="StoreScreens" component={DrawerNavigator} />
          )}
          {user && user.role.alias === 'CLIENT' && (
            <Stack.Screen name="ClientPostsScreen" component={ClientPostsScreen} />
          )}
        </>
      )}
    </Stack.Navigator>
  );
};

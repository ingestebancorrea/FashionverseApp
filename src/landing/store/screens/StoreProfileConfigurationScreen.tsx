import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { landingStyles } from '../../../theme/landingTheme';
import { AuthContext } from '../../../context/auth/AuthContext';
import { ItemSeparator } from '../components';

const menuItem = [
  {
    id: 1,
    name: 'card-account-details-outline',
    label: 'Datos básicos',
    navigate: 'StoreBasicDataScreen',
  },
  {
    id: 2,
    name: 'account-settings-outline',
    label: 'Suscripción',
    navigate: 'StoreProfileSettingsScreen',
  },
  {
    id: 3,
    name: 'door-closed',
    label: 'Cerrar sesión',
    navigate: 'LoginScreen',
  },
];

export const StoreProfileConfigurationScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { logOut } = useContext(AuthContext);

  const onNavigate = (itemId: number, screen: string) => {
    if (itemId === 3) {
      logOut();
    } else {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={landingStyles.mainContainer}>
      {
        menuItem.map(item => (
          <View key={item.id}>
            <TouchableOpacity
              style={{
                ...landingStyles.menuButton,
                flexDirection: 'row',
                marginLeft: 10
              }}
              onPress={() => onNavigate(item.id, item.navigate)}
            >
              <MaterialCommunityIcon
                name={item.name}
                size={22}
                color="#DEA76B"
              />
              <Text style={{ fontSize: 18, color: 'black', marginLeft: 6 }}>{item.label}</Text>
            </TouchableOpacity>

            <ItemSeparator  />
          </View>
        ))
      }
    </View>
  );
};

import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { Image, View, TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { landingStyles } from '../theme/landingTheme';
import { StoreProductScreen, StoreProductsScreen, SalesIndicatorScreen, SellConditionsScreen, StorePostsScreen, PostDescriptionScreen, PostTypesScreen } from '../landing/store/screens';
import { Header } from '../landing/components/Header';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
    // Hook que permite conocer el tamaño de la pantalla
    const { width } = useWindowDimensions();

    return (
        <Drawer.Navigator
            screenOptions={{
                drawerType: width >= 768 ? 'permanent' : 'front', // Menú modo horizontal
                headerShown: true, // Oculta la hamburguesa
                headerStyle: {
                    backgroundColor: '#F2EDE0',
                },
                headerTitle: (props) => <Header {...props} />,
                headerTitleStyle: {
                    alignItems: 'center',
                    marginLeft: 200,
                },
            }}
            drawerContent={(props) => <MenuInterno {...props} />}
        >
            <Drawer.Screen name="SalesIndicatorScreen" component={SalesIndicatorScreen} options={{unmountOnBlur: true}} />
            <Drawer.Screen name="StoreProductsScreen" component={StoreProductsScreen} options={{unmountOnBlur: true}} />
            <Drawer.Screen name="StoreProductScreen" component={StoreProductScreen} options={{unmountOnBlur: true}} />
            <Drawer.Screen name="SellConditionsScreen" component={SellConditionsScreen} options={{unmountOnBlur: true}} />
            <Drawer.Screen name="StorePostsScreen" component={StorePostsScreen} options={{unmountOnBlur: true}} />
            <Drawer.Screen name="PostDescriptionScreen" component={PostDescriptionScreen} options={{unmountOnBlur: true}} />
            <Drawer.Screen name="PostTypesScreen" component={PostTypesScreen} options={{unmountOnBlur: true}} />
        </Drawer.Navigator>
    );
};

const MenuInterno = ({ navigation }: DrawerContentComponentProps) => {
    return (
        <DrawerContentScrollView>
            {/* Contenedor del avatar */}
            <View style={landingStyles.avatarContainer}>
                <Image
                    source={{
                        uri: 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg',
                    }}
                    style={landingStyles.avatar}
                />
            </View>

            {/* Opciones de menú */}
            <View style={landingStyles.menuContainer}>
                <TouchableOpacity
                    style={{
                        ...landingStyles.menuButton,
                        flexDirection: 'row',
                    }}
                    onPress={() => navigation.navigate('SalesIndicatorScreen')}
                >
                    <Icon name="home-outline" size={23} color="black" />
                    <Text style={landingStyles.menuText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        ...landingStyles.menuButton,
                        flexDirection: 'row',
                    }}
                    onPress={() => navigation.navigate('StoreProductsScreen')}
                >
                    <Icon name="shirt-outline" size={23} color="black" />
                    <Text style={landingStyles.menuText}>Productos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        ...landingStyles.menuButton,
                        flexDirection: 'row',
                    }}
                    onPress={() => navigation.navigate('StorePostsScreen')}
                >
                    <Icon name="image-outline" size={23} color="black" />
                    <Text style={landingStyles.menuText}>Publicaciones</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
};

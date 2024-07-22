import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { Image, View, TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import { styles } from '../theme/landingTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { SalesIndicatorScreen } from '../landing/store/screens/SalesIndicatorScreen';
import { ProductsScreen } from '../landing/store/screens/ProductsScreen';
import { PostsScreen } from '../landing/client/screens/PostsScreen';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
    // Hook que permite conocer el tamaño de la pantalla
    const { width } = useWindowDimensions();

    return (
        <Drawer.Navigator
            screenOptions={{
                drawerType: width >= 768 ? 'permanent' : 'front', // Menú modo horizontal
                headerShown: false, // Oculta la hamburguesa
            }}
            drawerContent={(props) => <MenuInterno {...props} />}
        >
            <Drawer.Screen name="SalesIndicatorScreen" component={SalesIndicatorScreen} />
            <Drawer.Screen name="ProductsScreen" component={ProductsScreen} />
            <Drawer.Screen name="PostsScreen" component={PostsScreen} />
        </Drawer.Navigator>
    );
};

const MenuInterno = ({ navigation }: DrawerContentComponentProps) => {
    return (
        <DrawerContentScrollView>
            {/* Contenedor del avatar */}
            <View style={styles.avatarContainer}>
                <Image
                    source={{
                        uri: 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg',
                    }}
                    style={styles.avatar}
                />
            </View>

            {/* Opciones de menú */}
            <View style={styles.menuContainer}>
                <TouchableOpacity
                    style={{
                        ...styles.menuButton,
                        flexDirection: 'row',
                    }}
                    onPress={() => navigation.navigate('ProductsScreen')}
                >
                    <Icon name="compass-outline" size={23} color="black" />
                    <Text style={styles.menuText}>Productos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        ...styles.menuButton,
                        flexDirection: 'row',
                    }}
                    onPress={() => navigation.navigate('PostsScreen')}
                >
                    <Icon name="cog-outline" size={23} color="black" />
                    <Text style={styles.menuText}>Publicaciones</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
};

import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export const Profile = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://retaildesignblog.net/wp-content/uploads/2014/02/Industrie-store-by-Popstore-London.jpg' }}
                    style={styles.image}
                />

                <Image
                    source={require('../../../assets/UserIcon.png')}
                    style={styles.userIcon}
                />

                <Text style={styles.storeText}>Store</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>5</Text>
                    <Text style={styles.statText}>Seguidores</Text>
                </View>

                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>5</Text>
                    <Text style={styles.statText}>Siguiendo</Text>
                </View>

                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>5</Text>
                    <Text style={styles.statText}>Publicaciones</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    header: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    userIcon: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: -30,
    },
    storeText: {
        fontWeight: 'bold',
        fontSize: 16,
        position: 'absolute',
        bottom: -50,
        color: 'black',
        padding: 5,
        borderRadius: 5,
        textAlign: 'center',
        width: 100,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 50,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        color: '#DEA76B',
    },
    statText: {
        fontSize: 14,
        color: 'black',
    },
});

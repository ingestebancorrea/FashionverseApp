import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props extends StackScreenProps<any, any> {
    label: string;
    navigateTo: string;
}

export const AddButton = ({ navigation, route, label, navigateTo }:Props) => {
    const handleNavigation = () => {
        navigation.navigate(navigateTo);
    };

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={handleNavigation}
            >
                <Text style={styles.buttonText}>{label}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 15,
    },
    button: {
        padding: 12,
        borderWidth: 2,
        borderColor: '#DEA76B',
        backgroundColor: '#DEA76B',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
});

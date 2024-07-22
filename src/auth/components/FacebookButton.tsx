import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  label: string;
  onEvent: () => void;
}

export const FacebookButton = ({ label, onEvent }:Props) => {
    return (
        <View>
            <TouchableOpacity
                onPress={onEvent}
                style={styles.facebookButton}
            >
                <View style={styles.buttonContent}>
                    <Icon
                        name="logo-facebook"
                        color="white"
                        size={24} // Aumentar tamaño de icono
                    />
                    <Text style={styles.buttonText}>{label}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    facebookButton: {
        backgroundColor: '#3B5998',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10, // Agrega un espacio entre el icono y el texto
    },
});

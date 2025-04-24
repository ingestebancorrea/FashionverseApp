import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    label: string;
    onEvent: () => void;
}

export const GoogleButton = ({ label, onEvent }: Props) => {
    return (
        <View style={styles.parentContainer}>
            <TouchableOpacity
                onPress={onEvent}
                style={styles.facebookButton}
            >
                <View style={styles.buttonContent}>
                    <Icon
                        name="logo-google"
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
    parentContainer: {
        marginTop: 15,
    },
    facebookButton: {
        backgroundColor: '#1B7A97',
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

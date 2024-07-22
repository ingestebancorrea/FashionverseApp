import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';

interface Props {
    label: string;
    onEvent?: (data?:any) => void;
}

export const CustomButton = ({ label, onEvent }:Props) => {
    return (
        <View style={{ marginTop: 15 }}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={onEvent}
            >
                <Text style={styles.buttonText}>{label}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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

import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Text } from 'react-native';

interface Props {
    label: string;
    onEvent?: (data?:any) => void;
    style?: StyleProp<ViewStyle>;
    buttonDisabled?: boolean;
}

export const CustomButton = ({ label, onEvent, style, buttonDisabled = false  }:Props) => {
    return (
        <View style={style}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.button, buttonDisabled && styles.disabled]}
                onPress={onEvent}
                disabled={buttonDisabled}
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
    disabled: {
        backgroundColor: '#dadada',
        borderColor: '#dadada',
    },
});

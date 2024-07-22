import React, { useContext } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/auth/AuthContext';

interface Props extends StackScreenProps<any, any> {
    title: string;
    navigateTo: string;
    role?: string;
    buttonStyle: StyleProp<ViewStyle>;
    textColor: string;
}

export const NavigationButton = ({ navigation, route, title, navigateTo, role = '', buttonStyle, textColor }: Props) => {
    const { saveRole } = useContext(AuthContext);

    const storeRole = () => {
        if (role) {
            saveRole({
                alias: role,
            });
            navigation.replace(navigateTo);
        }
    };

    return (
        <View style={styles.containerButton}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={storeRole}
                style={[styles.button, buttonStyle]}
            >
                <Text style={{ ...styles.buttonText, color: textColor }}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    containerButton: {
        width: 260,
    },
    button: {
        borderWidth: 2,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
    },
});

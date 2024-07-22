import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../components/Header';

interface Props {
    children: any;
}

export const LandingLayout = ({ children }: Props) => {
    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'} // Para que mi teclado no tape la info que está en pantalla
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.formContainer}>
                        <Header />

                        <View style={{ marginTop: 20, flex: 1 }}>
                            {children}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
    },
});

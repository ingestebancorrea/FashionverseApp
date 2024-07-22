import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Background } from '../components/Background';
import { Logo } from '../../components/Logo';

interface Props {
    children: any;
    title?: string;
    parragraph?: string;
}

export const AuthLayout = ({ children, title, parragraph }: Props) => {
    return (
        <>
            <Background />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'} // Para que mi teclado no tape la info que está en pantalla
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.formContainer}>
                        <Logo />

                        {
                            (title) && (
                                <Text style={styles.title}>{title}</Text>
                            )
                        }

                        {
                            (parragraph) && (
                                <Text style={{
                                    ...styles.paragraph,
                                    marginTop: 15,
                                }}>
                                    {parragraph}
                                </Text>
                            )
                        }

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
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
});

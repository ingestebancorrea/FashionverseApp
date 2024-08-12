import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { landingStyles } from '../../../theme/landingTheme';
import { CustomButton } from '../../../components';

interface Props {
    isVisible: boolean;
    onClose: () => void;
}

export const ConfirmationModal = ({ isVisible, onClose }: Props) => {
    const navigation: NavigationProp<ParamListBase> = useNavigation();

    const onNavigate = (screen: string) => {
        navigation.navigate(screen);
    };

    return (
        <View>
            <Modal
                animationType="fade"
                visible={isVisible}
                transparent
                onRequestClose={onClose}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>¿Está seguro de agregar estos productos?</Text>

                        <View style={landingStyles.buttonContainer}>
                            <CustomButton label="Añadir" style={landingStyles.button} onEvent={() => onNavigate('StorePostsScreen')} />

                            <TouchableOpacity onPress={() => onNavigate('StorePostsScreen')}>
                                <Text style={[landingStyles.cancelText, landingStyles.linkText]}>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        height: 200,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        elevation: 10,
        borderRadius: 5,
    },
    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
    },
});

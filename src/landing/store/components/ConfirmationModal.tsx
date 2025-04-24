import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { landingStyles } from '../../../theme/landingTheme';
import { CustomButton } from '../../../components';

interface Props {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

export const ConfirmationModal = ({ isVisible, onClose, onSubmit }: Props) => {
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
                            <CustomButton label="Añadir" style={landingStyles.button} onEvent={onSubmit} />

                            <TouchableOpacity onPress={onClose}>
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

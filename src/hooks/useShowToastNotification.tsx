import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

export const useShowToastNotification = () => {
    const showToast = (type: string, text1: string, text2: string = '') => {
        Toast.show({
            type,
            text1,
            text2,
            text1Style: toastStyles.text1,
            text2Style: toastStyles.text2,
        });
    };

    return {
        showToast,
    };
};

const toastStyles = StyleSheet.create({
    text1: {
      fontSize: 20, // Tamaño de fuente personalizado para el primer texto
    },
    text2: {
      fontSize: 14, // Tamaño de fuente personalizado para el segundo texto
    },
});



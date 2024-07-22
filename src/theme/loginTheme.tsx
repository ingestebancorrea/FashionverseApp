import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
    formContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        height: 600,
        marginBottom: 50,
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
    },
    label: {
        marginTop: 25,
        color: 'black',
        fontWeight: 'bold',
    },
    inputField: {
        color: 'black',
        fontSize: 20,
    },
    inputFieldIOS: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        paddingBottom: 4,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    button: {
        borderWidth: 2,
        borderColor: '#DEA76B',
        backgroundColor: '#DEA76B',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
    },
    newUserContainer: {
        alignItems: 'flex-end',
        marginTop: 10,
    },
});

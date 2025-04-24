import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#201C3D',
        borderRadius: 10,
        paddingHorizontal: 12,
        marginVertical: 8,
        height: 50,
    },
    icon: {
        marginRight: 10,
    },
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
        flex: 1,
        color: '#BEBFC9',
        fontSize: 16,
        paddingVertical: 10,
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
        color: 'white',
        textAlign: 'center',
    },
    registerText: {
        color: '#F74962',
        textDecorationLine: 'underline',
    },
    newUserContainer: {
        alignItems: 'flex-end',
        marginTop: 10,
    },
});

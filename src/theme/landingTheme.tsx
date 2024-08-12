import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#5856D6',
    secondary: '',
};

export const landingStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    globalMargin: {
        marginHorizontal: 20,
    },
    titulo: {
        fontSize: 30,
        marginBottom: 10,
    },
    botonGrande: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    botonGrandeTexto: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    avatarContainer: {
        // backgroundColor: 'red',
        alignItems: 'center', // Centrar elemento
        marginTop: 20,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    menuContainer: {
        marginVertical: 30,
        marginHorizontal: 30,
    },
    menuButton: {
        marginVertical: 10,
    },
    menuText: {
        fontSize: 20,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        width: '90%',
        height: 290,
    },
    text: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row-reverse',
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    cancelText: {
        fontSize: 18,
        color: 'black',
        marginHorizontal: 10,
    },
    linkText: {
        textDecorationLine: 'underline',
    },
    button: {
        width: '50%',
        height: 55,
        marginRight: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        margin: 10,
    },
    cardContent: {
        flexDirection: 'row', // Alineación en fila horizontal
        alignItems: 'center', // Alinear elementos verticalmente al centro
    },
    selectedCard: {
        backgroundColor: '#F2EDE0',
        borderColor: '#F3F3F3',
    },
    cover: {
        width: 120,
        height: 140,
        margin: 10,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
        marginTop: 10,
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
    },
    bodyText: {
        fontSize: 16,
    },
    productsContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    detailsContainer: {
        width: '50%',
    },
    detail: {
        flexDirection: 'row',
        paddingVertical: 4,
    },
});

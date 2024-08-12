import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { landinStyles } from '../../theme/landingTheme';
import { CustomButton } from '../../components';

interface Props {
    children: any;
    navigation1: string;
    navigation2: string;
}

export const LandingLayout = ({ children, navigation1, navigation2 }: Props) => {
    const navigation: NavigationProp<ParamListBase> = useNavigation();

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={true} style={landinStyles.mainContainer}>
                {/* Children */}
                {children}

                {/* Botones */}
                <View style={landinStyles.buttonContainer}>
                    <CustomButton label="Confirmar" style={landinStyles.button} onEvent={() => navigation.navigate(navigation1)} />

                    <TouchableOpacity onPress={() => navigation.navigate(navigation2)}>
                        <Text style={[landinStyles.cancelText, landinStyles.linkText]}>
                            Cancelar
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

interface Props {
    text: string;
    value: boolean | undefined;
    onChange: (value: boolean) => void;
}

export const CustomRadioButton = ({ text, value, onChange }: Props) => {
    const [radioValue, setRadioValue] = useState(value === true);

    useEffect(() => {
        if (value !== undefined) {
            setRadioValue(value);
        }
    }, [value]);

    return (
        <View style={styles.radioContainer}>
            <RadioButton
                value="checked"
                status={radioValue ? 'checked' : 'unchecked'}
                onPress={() => {
                    setRadioValue(!radioValue);
                    onChange(!radioValue);
                }}
                color="#DEA76B"
            />
            <Text style={styles.radioText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Align text and radio button vertically
    },
    radioText: {
        color: 'black',
        fontSize: 18,
        marginHorizontal: 10,
    },
});

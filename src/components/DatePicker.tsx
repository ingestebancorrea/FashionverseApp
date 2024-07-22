import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    text: string;
    value: Date;
}

export const DatePicker = ({ text, value }: Props) => {
    const [date, setDate] = useState(value);
    const [buttonText, setButtonText] = useState('');

    useEffect(() => {
        if (value) {
            setDate(value);
            setButtonText(getButtonText(value));
        }
    }, [value]);

    const getButtonText = (selectedDate: Date) => {
        const currentDate = new Date();
        return selectedDate.toLocaleDateString() !== currentDate.toLocaleDateString() ? selectedDate.toLocaleDateString() : '';
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        if (currentDate) {
            setDate(currentDate);
            setButtonText(getButtonText(currentDate));
        }
    };

    const showMode = () => {
        DateTimePickerAndroid.open({
            value: date || new Date(), // Use a default date if date is undefined
            onChange: onChangeDate,
            mode: 'date',
            is24Hour: true,
        });
    };

    return (
        <View style={styles.dateContainer}>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={styles.dateButton}
                    activeOpacity={0.8}
                    onPress={showMode}
                >
                    {
                        buttonText
                            ? <Text style={styles.text}>{buttonText}</Text>
                            : <Text style={styles.text}>{text}</Text>
                    }
                </TouchableOpacity>
            </View>

            {/* Contenedor para el icono */}
            <View style={styles.iconContainer}>
                <Icon name="calendar-outline" size={20} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dateContainer: {
        flexDirection: 'row',
        backgroundColor: '#EFEFEF',
        padding: 12,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 15,
    },
    dateButton: {
        alignItems: 'flex-start',
    },
    text: {
        color: 'black',
        fontSize: 18,
    },
    iconContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
});

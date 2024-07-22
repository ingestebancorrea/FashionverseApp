import React from 'react';
import { StyleSheet, View } from 'react-native';
import SelectDropdown, { SelectDropdownProps } from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';

export const MultiSelect = ({ data, defaultButtonText, onFocus, ...props }: SelectDropdownProps) => {
    const renderDropdownIcon = () => (
        <Icon name="chevron-down-outline" size={20} />
    );

    return (
        <View style={{ marginTop: 10 }}>
            <SelectDropdown
                data={data}
                defaultButtonText={defaultButtonText}
                onFocus={onFocus}
                renderDropdownIcon={renderDropdownIcon}
                buttonTextAfterSelection={(selectedItem) => {
                    // Devuelve la propiedad 'label' del objeto selectedItem
                    return selectedItem.name;
                }}
                rowTextForSelection={(item) => {
                    // Devuelve la propiedad 'label' del objeto item
                    return item.name;
                }}
                buttonStyle={styles.dropdownButton}
                dropdownStyle={styles.dropdown}
                buttonTextStyle={styles.buttonText}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    dropdownButton: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        width: '100%',
    },
    dropdown: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    buttonText: {
        textAlign: 'left',
    },
});

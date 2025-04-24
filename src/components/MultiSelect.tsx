import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SelectDropdown, { SelectDropdownProps } from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';

export const MultiSelect = ({
    data,
    defaultButtonText,
    onFocus,
    onSelect,
    value,
    ...props
}: SelectDropdownProps & {
    onSelect?: (item: any) => void;
    value?: any;
}) => {
    const [selected, setSelected] = useState<any>(value);

    useEffect(() => {
        if (value) {
            setSelected(data.find(item => item.id === value.id) || null);
        }
    }, [value,data]);

    const renderDropdownIcon = () => (
        <Icon name="chevron-down-outline" size={20} />
    );

    return (
        <View style={{ marginTop: 10 }}>
            <SelectDropdown
                data={data}
                defaultButtonText={defaultButtonText}
                onFocus={onFocus}
                onSelect={onSelect}
                renderDropdownIcon={renderDropdownIcon}
                buttonTextAfterSelection={(selectedItem) => {
                    console.log('selectItem',selectedItem);
                    return selectedItem ? selectedItem.name : defaultButtonText;
                }}
                rowTextForSelection={(item) => {
                    // Devuelve la propiedad 'label' del objeto item
                    return item.name;
                }}
                buttonStyle={[styles.dropdownButton, props.disabled && styles.disabled]}
                dropdownStyle={styles.dropdown}
                buttonTextStyle={[styles.buttonText, props.disabled && styles.dissabledText]}
                defaultValue={selected}
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
    disabled: {
        backgroundColor: '#dadada',
        borderColor: '#dadada',
    },
    dissabledText: {
        color: 'gray',
    },
});

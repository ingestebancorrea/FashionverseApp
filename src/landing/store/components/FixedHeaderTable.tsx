import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { RowData } from '../interfaces/store.interfaces';

interface Props {
    rows: RowData[];
}

export const FixedHeaderTable = ({ rows }: Props) => {
    const state = {
        tableHead: ['ID', 'Talla', 'Cantidad'],
        widthArr: [100, 100, 100],
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                        <Row
                            data={state.tableHead}
                            widthArr={state.widthArr}
                            style={styles.head}
                            textStyle={styles.text}
                        />
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{ borderColor: "#C1C0B9" }}>
                            {rows.map((dataRow, index) => (
                                <Row
                                    key={index}
                                    data={[dataRow.id, dataRow.size.name, dataRow.available_quantity]}
                                    widthArr={state.widthArr}
                                    style={[styles.row, index % 2 === 0 ? { backgroundColor: '#ffffff' } : {}]}
                                    textStyle={styles.text}
                                />
                            ))}
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, height: 240, alignItems: 'center', padding: 16, paddingTop: 20 },
    head: { height: 40, backgroundColor: '#DEA76B' },
    text: { textAlign: 'center', fontWeight: 'bold' },
    dataWrapper: { marginTop: -1 },
    row: { height: 30 },
});

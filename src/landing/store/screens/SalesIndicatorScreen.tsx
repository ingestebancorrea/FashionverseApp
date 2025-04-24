import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
import { Controller, useForm } from 'react-hook-form';
import MonthPicker from 'react-native-month-year-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { landingStyles } from '../../../theme/landingTheme';
import { dataBarChart, dataLineChart, dataPieChart } from '../data/salesIndicator';
import { chartConfig } from '../config/chart';
import { ItemSeparator } from '../components';

export const SalesIndicatorScreen = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const showPicker = useCallback((value) => setShow(value), []);

  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      date: new Date(),
    },
  });

  const onSubmit = () => {
    // Handle form submission
  };

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;
      showPicker(false);
      setDate(selectedDate);
    },
    [date, showPicker],
  );

  return (
    <ScrollView style={landingStyles.mainContainer}>
        <View style={styles.contentContainer}>
          <Text style={landingStyles.title}>Indicadores de ventas</Text>

          <View style={styles.datePickerContainer}>
            <TouchableOpacity onPress={() => showPicker(true)} style={styles.datePickerButton}>
              <Ionicons name="calendar-outline" size={24} color="black" style={styles.icon} />
              <Text style={styles.datePickerText}>Periodo</Text>
            </TouchableOpacity>
          </View>

          {
            show && (
              <Controller
                defaultValue={new Date()}
                name="date"
                control={control}
                render={({ field: { value: inputValue } }) => (
                  <MonthPicker
                    onChange={onValueChange}
                    value={date}
                    minimumDate={new Date()}
                    maximumDate={new Date(2025, 5)}
                    locale="number"
                  />
                )}
              />
            )
          }

          <LineChart
            style={styles.lineChart}
            data={dataLineChart}
            width={Dimensions.get('window').width - 20}
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1}
            chartConfig={chartConfig}
            verticalLabelRotation={20}
          />

          <BarChart
            style={styles.barChart}
            data={dataBarChart}
            width={Dimensions.get('window').width - 20}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={chartConfig}
          />

          <PieChart
            style={styles.pieChart}
            data={dataPieChart}
            width={Dimensions.get('window').width - 20}
            height={220}
            chartConfig={chartConfig}
            accessor={'population'}
            backgroundColor={'transparent'}
            paddingLeft={''}
          />

          <ItemSeparator width="90%" />
        </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  lineChart: {
    marginTop: 15,
    borderRadius: 8,
  },
  totalSales: {
    color: 'black',
    marginTop: 5,
  },
  pieChart: {
    marginVertical: 8,
    borderRadius: 8,
  },
  productsSold: {
    color: 'black',
    marginTop: 5,
  },
  datePickerContainer: {
    backgroundColor: '#F3F3F3',
    width: '95%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  icon: {
    marginHorizontal: 10,
  },
  datePickerText: {
    color: 'black',
  },
  barChart: {
    borderRadius: 8,
    marginTop: 10,
  },
});

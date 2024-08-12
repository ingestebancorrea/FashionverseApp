import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { REACT_APP_AUTH_SERVICE } from '@env';
import { AuthLayout } from '../layout/AuthLayout';
import { CustomButton } from '../../components/CustomButton';
import { preferences } from '../data/auth.data';
import { useShowToastNotification } from '../../hooks/useShowToastNotification';
import { AuthContext } from '../../context/auth/AuthContext';
import { useAxiosPost } from '../../hooks/usePostAxios';
import { Loading } from '../../components';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> { }

export const PreferencesScreen = ({ navigation }: Props) => {
  const { finishRegister } = useContext(AuthContext);
  const [selectedPreferences, setSelectedPreferences] = useState<number[]>([]);
  const { showToast } = useShowToastNotification();
  const { postData, data, error, setError, isLoading } = useAxiosPost();

  const togglePreference = (id: number) => {
    const isSelected = selectedPreferences.includes(id);
    if (isSelected) {
      setSelectedPreferences(selectedPreferences.filter(prefId => prefId !== id));
    } else {
      setSelectedPreferences([...selectedPreferences, id]);
    }
  };

  const handleContinue = async () => {
    if (selectedPreferences.length > 0) {
      const requestData = selectedPreferences.map(id => ({ id_preference: id }));

      await postData(REACT_APP_AUTH_SERVICE,'/clientpreferences', requestData);
      data && finishRegister();
    } else {
      showToast('error', 'Error', 'Debes seleccionar al menos una preferencia!');
    }
  };

  const handleSkip = () => {
    finishRegister();
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Error en la inserción.', error, [{
        text: 'Ok',
        onPress: () => {
          setError(null);
          navigation.replace('LoginScreen');
        },
      }]);
    }
  }, [error, navigation, setError]);

  if (isLoading) { return (<Loading />); }

  return (
    <AuthLayout title="Elige tu categoría de moda favorita" parragraph="Puedes escoger más de uno">
      <View style={styles.mainContainer}>
        <View style={styles.perferencesContainer}>
          {
            preferences.map((item) => (
              <View key={item.id} style={{ width: '48%', marginTop: 10 }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.button, selectedPreferences.includes(item.id) && { backgroundColor: '#F2EDE0' }]}
                  onPress={() => togglePreference(item.id)}
                >
                  <Text style={[styles.buttonText, selectedPreferences.includes(item.id) && { color: '#DEA76B' }]}>{item.label}</Text>
                </TouchableOpacity>
              </View>
            ))
          }
        </View>

        <View style={{ marginBottom: 95 }}>
          <CustomButton label="Continuar" onEvent={handleContinue} style={{ paddingTop: 15 }} />

          <TouchableOpacity style={styles.textContainer} onPress={handleSkip}>
            <Text style={styles.text}>Saltar</Text>
          </TouchableOpacity>
        </View>

        { /* Toast Notification */}
        <Toast
          position="bottom"
          bottomOffset={40}
        />
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  perferencesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  button: {
    padding: 12,
    borderWidth: 2,
    borderColor: '#DEA76B',
    backgroundColor: '#DEA76B',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

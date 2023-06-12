import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
const Logout = () => {
  const navigation = useNavigation();
  const Logout = async () => {
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('firstName');
    await AsyncStorage.removeItem('personId');
    navigation.navigate('LoginScreen');
  };
  return (
    <View>
      <Text onPress={() => Logout()}>Logout</Text>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Logout = ({navigation}) => {
  const Logout = async () => {
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('password');
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

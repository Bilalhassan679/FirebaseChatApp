import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const MainScreen = ({navigation}) => {
  const Logout = async () => {
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('password');
    navigation.navigate('LoginScreen');
  };
  return (
    <View>
      <Text>MainScreen</Text>
      <Text onPress={Logout}>Logout</Text>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});

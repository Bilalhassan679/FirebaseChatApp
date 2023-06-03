import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(async () => {
      (await AsyncStorage.getItem('email')) !== null
        ? navigation.navigate('MainScreen')
        : navigation.navigate('LoginScreen');
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
  },
});

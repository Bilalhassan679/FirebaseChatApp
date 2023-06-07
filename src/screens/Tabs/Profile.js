import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Profile = () => {
  const [users, setUsers] = React.useState();
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const email = await AsyncStorage.getItem('email');
    console.log(email);
    const response = await firestore()
      .collection('users')
      .where('email', '!=', email)
      .get();
    response.forEach(doc => {
      if (doc.data != []) {
        setUsers(doc.data());
      }
    });
  };

  console.log(users);
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});

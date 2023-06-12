import {
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';

import {firebase} from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
const Profile = ({userId}) => {
  const navigation = useNavigation();
  const [users, setUsers] = React.useState([]);
  const db = firebase.firestore();
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    var emails = await AsyncStorage.getItem('email');
    const email = JSON.parse(emails);
    if (emails) {
      await db
        .collection('users')
        .where('email', '!=', email)
        .get()
        .then(snap => {
          snap.forEach(doc => {
            if (doc.data != []) {
              setUsers([doc.data()]);
            }
          });
        });
      // const querySnapshot = await getDocs(collection(users, 'users'));
      // const usersRef = firebase.firestore().collection('users').doc(email);

      // const response = await usersRef.get();
      // console.log(usersRef, 'response');
      // const usersData = response._docs
      //   .filter(doc => doc._data.email !== email)
      //   .map(doc => doc._data);
    }
  };

  console.log(users, 'user1');

  return (
    <View>
      <FlatList
        data={users}
        contentContainerStyle={{width: '100%'}}
        keyExtractor={item => item.userId.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ChatScreen', {data: item, id: userId})
              }
              style={styles.userProfile}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  resizeMode: 'contain',
                }}
                source={{
                  uri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                }}
              />
              <View style={{marginLeft: 10, justifyContent: 'center'}}>
                <Text>{item.firstName}</Text>
                <Text>{item.email}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  userProfile: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});

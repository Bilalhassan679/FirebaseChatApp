import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import Profile from '../Tabs/Profile';
import Logout from '../Tabs/Logout';
import {useRoute} from '@react-navigation/native';

const MainScreen = () => {
  const route = useRoute();
  const userId = route.params.userId;
  const [tab, setTabs] = React.useState(0);

  return (
    <>
      <View style={{flex: 1}}>
        {tab === 0 ? <Profile userId={userId} /> : <Logout />}
      </View>
      <View style={styles.tabBar}>
        <Text
          onPress={() => {
            setTabs(0);
          }}>
          Profile
        </Text>
        <Text onPress={() => setTabs(1)}>LogOut</Text>
      </View>
    </>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'purple',
    height: 80,
    justifyContent: 'space-around',
    alignItems: 'center',
    // borderRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

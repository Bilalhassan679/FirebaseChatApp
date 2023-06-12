import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import {create} from 'react-test-renderer';
import {firebase} from '@react-native-firebase/firestore';
const ChatScreen = () => {
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    // ]);
    const subscriber = firebase
      .firestore()
      .collection('chats')
      .doc('' + route.params.id + route.params.data.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const allMsg = querySnapshot.docs.map(item => {
          return {...item._data, createdAt: Date.parse(item._data.createdAt)};
        });
        setMessages(allMsg);
      });
    return () => subscriber();
  }, []);
  const onSend = useCallback((messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sentBy: route.params.id,
      receivedBy: route.params.data.userId,
      createdAt: new Date(msg.createdAt),
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    firebase
      .firestore()
      .collection('chats')
      .doc('' + route.params.id + route.params.data.userId)
      .collection('messages')
      .add(myMsg);
    firebase
      .firestore()
      .collection('chats')
      .doc('' + route.params.data.userId + route.params.id)
      .collection('messages')
      .add(myMsg);
  }, []);
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        // _id: 1,
        _id: route.params.id,
      }}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});

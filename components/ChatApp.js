import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import axios from 'axios';
import queryString from 'query-string';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { AuthContext } from '../components/context';
import { API_URL } from '@env';
import { GiftedChat, Bubble, utils, Time } from 'react-native-gifted-chat';

export default function ChatApp() {
  const { loginState } = React.useContext(AuthContext);
  const { messageData, socket } = useStoreState((state) => state);
  const nickname = loginState.nickname;
  const setMessageData = useStoreActions((actions) => actions.setMessageData);
  const msg = messageData || [];

  const { isSameUser, isSameDay } = utils;

  const renderTime = (props) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: '#212121',
          },
        }}
      />
    );
  };

  const renderBubble = (props) => {
    const isSameThread =
      isSameUser(props.currentMessage, props.previousMessage) &&
      isSameDay(props.currentMessage, props.previousMessage);

    return (
      <View>
        {isSameThread ? null : (
          <Text style={{ marginTop: 5, fontSize: 13 }}>
            {props.currentMessage.user.name}
          </Text>
        )}
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: '#fff',
            },
            right: {
              backgroundColor: '#000',
            },
          }}
        />
      </View>
    );
  };

  // Recieve effect
  useEffect(() => {
    socket.on('receive_message', (value) => {
      const uid = Math.floor(Math.random() * 1000000000000);
      const data = {
        _id: uid,
        createdAt: new Date(),
        text: value.message,
        user: {
          _id: value.username,
          name: value.username,
          avatar: 'https://picsum.photos/200',
        },
      };

      setMessageData([...msg, data]);
    });
  }, [messageData, msg, setMessageData, socket]);

  // Delete effect
  useEffect(() => {
    socket.on('delete_message', (data) => {
      const temp = msg.filter((item) => item.text !== data.message);
      setMessageData(temp);
    });
  }, [messageData, msg, setMessageData, socket]);

  const onSend = useCallback((messages = []) => {
    const data = messages[0].text;
    console.log(data);
    socket.emit('send_message', {
      message: data,
      website: 'Da-Connect',
    });
    console.log(messages[0].text);
  }, []);

  return (
    <View style={{ flex: 1, paddingBottom: 56 }}>
      <GiftedChat
        messages={msg}
        inverted={false}
        scrollToBottom
        renderBubble={renderBubble}
        renderTime={renderTime}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: nickname,
        }}
      />
    </View>
  );
}

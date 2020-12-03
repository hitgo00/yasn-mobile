import React from 'react';
import { Thumbnail, Text, Left, Body, View } from 'native-base';
import { Avatar } from 'react-native-paper';
import moment from 'moment';

export default function Comments(props) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        width: '100%',
        backgroundColor: 'transparent',
      }}
    >
      <Avatar.Text
        size={60}
        label={props.name ? props.name[0] : 'X'}
        style={{
          width: 45,
          height: 45,
          color: 'white',
          backgroundColor: '#EAEAEA',
        }}
      />
      <View style={{ padding: 5, marginLeft: 10 }}>
        <Text style={{ color: 'white' }}>{props.comment}</Text>
        <Text note>{moment(props.date).format('MMM D')}</Text>
      </View>
    </View>
  );
}

import React, { Component, useRef, useState } from 'react';
import moment from 'moment';
import { CLOUDINARY_CLOUDNAME } from '@env';

import { Video, Audio } from 'expo-av';
import { Image, ScrollView, TouchableHighlight } from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right,
} from 'native-base';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function PostCardDetails(props) {

  const videoRef = useRef(null);
  const [showComment, setShowComment] = useState(false);

  return (
    <Modal
      onBackButtonPress={() => props.setOpenModal(false)}
      isVisible={props.openModal}
      style={styles.overlay}
    >
      <ScrollView>
        <Card>
          {props.renderPost()}
          <CardItem>
            <Button transparent>
              <Icon name="ios-thumbs-up" size={21} color="#208af5" />
              <Text>12 </Text>
            </Button>
            <Button transparent>
              <Icon name="ios-chatbubbles" size={21} color="#208af5" />
              <Text>4</Text>
            </Button>
            <Right>{/* <Text>11h ago</Text> */}</Right>
          </CardItem>
          <CardItem style={styles.commentSection}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Comments</Text>
            <Input 
              placeholder="Add Comment..." 
              rightIcon={<AntDesign name="rightcircle" size={30} color="black" />}    
            />
            <Left>
              <Thumbnail
                source={{ uri: 'https://picsum.photos/seed/picsum/200' }}
                style={{width: 50, height: 50}}
              />
              <Body>
                <Text>Lorem ipsum, dolor sit amet consectetu</Text>
                <Text note>{moment(props.date).format('MMM D')}</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay:{
    margin: 0,
    alignItems: undefined,
    justifyContent: undefined,
    backgroundColor: 'white'
  },
  commentSection: {
    flexDirection: 'column'
  }
})
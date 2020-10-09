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
          <CardItem>
            <Left>
              <Thumbnail
                source={{ uri: 'https://picsum.photos/seed/picsum/200' }}
              />
              <Body>
                <Text>{props.title}</Text>
                <Text note>{moment(props.date).format('MMM D')}</Text>
              </Body>
            </Left>
            <Right>
              <MaterialIcons   
                name="cancel" 
                size={40} 
                color="grey" 
                onPress={() => props.setOpenModal(false)}
              />
            </Right>
          </CardItem>
          <CardItem cardBody>
            {props.imageUrl ? (
              <Image
                source={{
                  uri:
                    `https://res.cloudinary.com/${CLOUDINARY_CLOUDNAME}/image/upload/c_crop,g_custom/v1/` +
                    props.imageUrl,
                }}
                style={{ height: 300, width: null, flex: 1 }}
              />
            ) : (
              <TouchableHighlight
                onPress={() => {
                  videoRef.current.getStatusAsync().then((data) => {
                    if (data.isPlaying) {
                      videoRef.current.pauseAsync();
                    } else {
                      //TODO fix ios silent mode issue
                      // Audio.setAudioModeAsync({
                      //   playsInSilentModeIOS,
                      // });
                      videoRef.current.playAsync();
                    }
                  });
                }}
              >
                <Video
                  on
                  ref={videoRef}
                  source={{
                    uri:
                      `https://res.cloudinary.com/${CLOUDINARY_CLOUDNAME}/video/upload/q_auto/v1588194153/` +
                      props.videoUrl,
                  }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  usePoster
                  onLoad={() => videoRef.current.pauseAsync()}
                  // resizeMode="contain"
                  shouldPlay={true}
                  isLooping
                  // useNativeControls={true}
                  style={{ width: 375, height: 300 }}
                />
              </TouchableHighlight>
            )}
          </CardItem>
          <CardItem>
            <Body>
              <Text note>{props.description}</Text>
            </Body>
          </CardItem>
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
import React, { Component, useRef } from 'react';
import moment from 'moment';
import { CLOUDINARY_CLOUDNAME } from '@env';

import { Video, Audio } from 'expo-av';
import { Image, TouchableHighlight } from 'react-native';
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
import Icon from 'react-native-vector-icons/Ionicons';
export default function PostCard(props) {
  const videoRef = useRef(null);

  return (
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
    </Card>
  );
}

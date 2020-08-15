import React, { Component, useRef } from 'react';

import { Video } from 'expo-av';
import { Image } from 'react-native';
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
            <Text note>11h ago</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        {props.imageUrl ? (
          <Image
            source={{
              uri:
                `https://res.cloudinary.com/${cloudname}/image/upload/c_crop,g_custom/v1/` +
                props.imageUrl,
            }}
            style={{ height: 300, width: null, flex: 1 }}
          />
        ) : (
          <Video
            ref={videoRef}
            source={{
              uri:
                `https://res.cloudinary.com/${cloudname}/video/upload/q_auto/v1588194153/` +
                props.videoUrl,
            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            usePoster
            // onLoad={() => videoRef.current.pauseAsync()}
            // resizeMode="contain"
            shouldPlay
            isLooping
            useNativeControls={true}
            style={{ width: 375, height: 300 }}
          />
        )}
      </CardItem>
      <CardItem>
        <Left>
          <Button transparent>
            <Icon name="ios-thumbs-up" size={21} color="#208af5" />
            <Text>12 Likes</Text>
          </Button>
        </Left>
        <Body>
          <Button transparent>
            <Icon name="ios-chatbubbles" size={21} color="#208af5" />
            <Text>4 Comments</Text>
          </Button>
        </Body>
        <Right>{/* <Text>11h ago</Text> */}</Right>
      </CardItem>
    </Card>
  );
}

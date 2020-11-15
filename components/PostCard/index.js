import React, { Component, useRef } from 'react';
import moment from 'moment';
import { CLOUD } from '@env';
import { Caption } from 'react-native-paper';
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
  View,
  Input,
  Item,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import AddComment from './AddComment';

export default function PostCard(props) {
  const videoRef = useRef(null);
  const [comment, setComment] = useState(false)

  const renderPost = () => (
    <>
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
                `https://res.cloudinary.com/${CLOUD}/image/upload/c_crop,g_custom/v1/` +
                props.imageUrl,
            }}
            style={{ height: 375, width: 375, flex: 1 }}
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
                  `https://res.cloudinary.com/${CLOUD}/video/upload/q_auto/v1588194153/` +
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
              style={{ width: 375, height: 375 }}
            />
          </TouchableHighlight>
        )}
      </CardItem>
    </>
  )

  return (
    <>
      <Card>
        {renderPost()}
        <CardItem>
          <Button transparent>
            <Icon name="ios-thumbs-up" size={21} color="#208af5" />
            <Text>12 </Text>
          </Button>
          <Button onPress={() => setComment(!comment)} transparent>
            <Icon name="ios-chatbubbles" size={21} color="#208af5" />
            <Text>4</Text>
          </Button>
          <Right>{/* <Text>11h ago</Text> */}</Right>
        </CardItem>
        {props.description?
        <Caption style={{marginLeft:15,marginBottom:15, fontSize:15}}>{props.description}</Caption>
        :null}

         {comment? <CardItem style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Comments</Text>
            {/* <Input 
              placeholder="Add Comment..." 
              rightIcon={<AntDesign name="rightcircle" size={30} color="black" />}    
            /> */}
            <AddComment />
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
          </CardItem>:null}



      </Card>
    </>
  );
}
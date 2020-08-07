import React, { Component } from 'react';
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
export default function PostCard() {
  return (
    <Card>
      <CardItem>
        <Left>
          <Thumbnail
            source={{ uri: 'https://picsum.photos/seed/picsum/200' }}
          />
          <Body>
            <Text>First Post</Text>
            <Text note>11h ago</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{
            uri: 'https://picsum.photos/seed/picsum/300',
          }}
          style={{ height: 300, width: null, flex: 1 }}
        />
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

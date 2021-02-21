import React, { useRef, useEffect, useState } from 'react';
import moment from 'moment';
import { CLOUD } from '@env';
import { Caption, Avatar } from 'react-native-paper';
import { Video } from 'expo-av';
import { Image, TouchableHighlight, Alert } from 'react-native';
import {
  Card,
  CardItem,
  Text,
  Button,
  Left,
  Body,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import AddComment from './AddComment';
import Comments from './Comments';
import { AuthContext } from '../context';
import axios from 'axios';
import queryString from 'query-string';

export default function PostCard(props) {
  const API_URL = 'https://connectda.herokuapp.com';

  const videoRef = useRef(null);
  const [comment, setComment] = useState(false);
  const [selected, setSelected] = useState(false);
  const [likeCount, setLikeCount] = useState(props.likes.likers.length);
  const [comments, setComments] = useState(props.comments);
  const [commentCount, SetCommentCount] = useState(props.comments.length);

  const { loginState } = React.useContext(AuthContext);
  const email = loginState.user.email;
  const googleToken = loginState.userToken;

  useEffect(() => {
    if (props.likes.likers.find((e) => e === loginState.userDetails_server._id))
      setSelected(true);
  }, []);

  const handleLike = (selected) => {
    let liked = !selected;

    axios
      .post(
        `${API_URL}/handlelike?` +
          queryString.stringify({ _id: props._id, email, googleToken }),
        {
          currentUserId: loginState.userDetails_server._id,
          email,
          liked,
          //liked is true if user like , false if unliked ;
        }
      )
      .then((res) => console.log('like Added'))
      .catch((err) => console.log(err));
  };

  const renderPost = () => (
    <>
      <CardItem style={{ backgroundColor: 'transparent', }}>
        <Left>
          <Avatar.Text
            size={60}
            label={props.creator.name ? props.creator.name[0] : 'X'}
            style={{
              width: 45,
              height: 45,
              color: 'white',
              backgroundColor: '#EAEAEA',
            }}
          />
          <Body>
            <Text style={{ color: 'white' }}>{props.title}</Text>
            <Text style={{ color: 'gray' }}>
              {moment(props.date).format('MMM D')}
            </Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem
        cardBody
        style={{ backgroundColor: 'transparent', marginHorizontal: 2 }}
      >
        {props.imageUrl ? (
          <Image
            source={{
              uri:
                `https://res.cloudinary.com/${CLOUD}/image/upload/c_crop,g_custom/v1/` +
                props.imageUrl,
            }}
            style={{
              height: 375,
              width: 375,
              flex: 1,
              borderRadius: 10,
            }}
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
              style={{ width: 375, height: 375, borderRadius: 10 }}
            />
          </TouchableHighlight>
        )}
      </CardItem>
    </>
  );

  return (
    <>
      <Card
        style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
      >
        {renderPost()}
        <CardItem style={{ backgroundColor: 'transparent' }}>
          <Button
            transparent
            onPress={() => {
              handleLike(selected);
              selected
                ? setLikeCount(likeCount - 1)
                : setLikeCount(likeCount + 1);
              setSelected(!selected);
            }}
          >
            <AntDesign
              name="heart"
              size={25}
              color={selected ? '#FF0000' : '#D3D3D3'}
            />
            <Text style={{ color: 'white' }}>{likeCount} </Text>
          </Button>
          <Button onPress={() => setComment(!comment)} transparent>
            <Icon name="ios-chatbubbles" size={25} color="#D3D3D3" />
            <Text style={{ color: 'white' }}>{commentCount}</Text>
          </Button>
        </CardItem>
        {props.description ? (
          <Caption
            style={{
              marginLeft: 15,
              marginBottom: 15,
              fontSize: 15,
              color: 'white',
            }}
          >
            {props.description}
          </Caption>
        ) : null}

        {comment ? (
          <CardItem
            style={{ flexDirection: 'column', backgroundColor: 'transparent' }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
              Comments
            </Text>
            <AddComment
              postId={props._id}
              username={loginState.userDetails_server.username}
              userId={loginState.userDetails_server._id}
              name={loginState.userDetails_server.name}
              email={email}
              googleToken={googleToken}
              handleComment={(comment) => {
                setComments((comments) => [...comments, comment]);
                SetCommentCount(commentCount + 1);
              }}
            />
            {comments
              ? comments.map((comment, i) => (
                  <Comments
                    {...comment}
                    key={i}
                    // onClick={handleComments}
                  />
                ))
              : null}
          </CardItem>
        ) : null}
      </Card>
    </>
  );
}

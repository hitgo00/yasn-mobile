import React, { useEffect, useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { ImageBackground, Alert } from 'react-native';
import { Container, Text, Content, Header, Body } from 'native-base';
//import PostCard from "../components/PostCard";
import PostCard from '../components/PostCard/index';
import { AuthContext } from '../components/context';
//import { API_URL } from "@env";
import { useFocusEffect } from '@react-navigation/native';

const image = {
  uri:
    'https://res.cloudinary.com/hitgo/image/upload/v1606861612/BackgroundS_wxglzf.jpg',
};
export default (Feed = () => {
  const [browseTag, SetBrowseTag] = useState('');
  const [posts, setPosts] = useState();
  const { loginState } = React.useContext(AuthContext);

  const email = loginState.user.email;
  const googleToken = loginState.userToken;
  console.log('From Feed : ', loginState);
  const API_URL = 'https://connectda.herokuapp.com';
  console.log('Feed: ', API_URL);
  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(
          `${API_URL}/home?` +
            queryString.stringify(
              { tag: browseTag, email, googleToken },
              { withCredentials: true }
            )
        )
        .then((res) => {
          if (res.data !== 'invalid token') {
            console.log('========Again=======');
            setPosts(res.data);
          } else {
            Alert.alert('Your Session is Expired', 'Please Login Again.');
          }
        })

        .catch((err) => console.log(err));
    }, [])
  );

  useEffect(() => {
    axios
      .get(
        `${API_URL}/home?` +
          queryString.stringify(
            { tag: browseTag, email, googleToken },
            { withCredentials: true }
          )
      )
      .then((res) => {
        if (res.data !== 'invalid token') {
          console.log(
            '........................................Again..........................................................'
          );
          setPosts(res.data);
        } else {
          Alert.alert('Your Session is Expired', 'Please Login Again.');
        }
      })

      .catch((err) => console.log(err));
  }, []);
  //  console.log(posts);

  {
    /* <SafeAreaView style={{ flex: 1 }}>{<GoogleSignIn />}</SafeAreaView>; */
  }
  return (
    <Content style={{ backgroundColor: '#000000', marginBottom: 56 }}>
      <ImageBackground
        source={image}
        style={{
          flex: 1,
          resizeMode: 'repeat',
          justifyContent: 'center',
        }}
      >
        {posts
          ? posts.map((post) => <PostCard {...post} key={post._id} />)
          : null}
      </ImageBackground>
    </Content>
  );
});

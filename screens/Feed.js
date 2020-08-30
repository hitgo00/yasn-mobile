import React, { useEffect, useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Container, Text, Content, Header, Body } from 'native-base';
import PostCard from '../components/PostCard';
import GoogleSignIn from './GoogleSignIn';

export default (Feed = () => {
  const [browseTag, SetBrowseTag] = useState('');
  const [posts, setPosts] = useState();

  useEffect(() => {
    axios
      .get(
        `https://connectda.herokuapp.com/home?` +
          queryString.stringify({ tag: browseTag }, { withCredentials: true })
      )
      .then((res) => {
        setPosts(res.data);
      })

      .catch((err) => console.log(err));
  }, []);
  console.log(posts);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <GoogleSignIn /> */}
      <Content>
        {posts
          ? posts.map((post) => (
              <>
                <PostCard {...post} key={post._id} />
              </>
            ))
          : null}
      </Content>
    </SafeAreaView>
  );
});

import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Container, Text, Content, Header, Body } from 'native-base';
import PostCard from './components/PostCard';
export default function App() {
  console.log('hii');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header>
        <Body>
          <Text>Connect</Text>
        </Body>
      </Header>
      <Content>
        <PostCard />
        <PostCard />
        <PostCard />
      </Content>
    </SafeAreaView>
  );
}

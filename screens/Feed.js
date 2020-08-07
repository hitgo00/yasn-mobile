import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Container, Text, Content, Header, Body } from "native-base";
import PostCard from "../components/PostCard";
export default (Feed = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Content>
        <PostCard />
        <PostCard />
        <PostCard />
      </Content>
    </SafeAreaView>
  );
});

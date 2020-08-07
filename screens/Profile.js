import React from "react";
import { View, SafeAreaView } from "react-native";
import { Text, Container } from "native-base";

export default (Profile = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Text>Hello, My name is HitGo!</Text>
      </Container>
    </SafeAreaView>
  );
});

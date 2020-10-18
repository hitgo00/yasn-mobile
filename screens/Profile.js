import React from "react";
import { Container } from "native-base";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Text, Image } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../components/context";
import { AsyncStorage, ActivityIndicator } from "react-native";
import { Card,Button,TextInput,HelperText } from 'react-native-paper';

export default (Profile = () => {
  const { authcontext, loginState } = React.useContext(AuthContext);
  const { signOut } = authcontext;

  console.log("From Profile....", loginState.user);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text h1 style={{ padding: "10%" }}>
          Hello {loginState.user.name}
        </Text>
        <Image
          source={{ uri: loginState.user.photoUrl }}
          style={{ width: 200, height: 200, borderRadius: 50 }}
          PlaceholderContent={<ActivityIndicator />}
        />
      </Container>
      <Button
        style={{margin:10,justifyContent:'center',alignItems:'center'}}
        mode="outlined"
        icon="power"
        onPress={signOut}
      >Sign Out</Button>
    </SafeAreaView>
  );
});

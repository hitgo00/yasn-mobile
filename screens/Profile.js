import React from "react";
import { Container } from "native-base";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Button, Text, Image } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../components/context";
import { AsyncStorage, ActivityIndicator } from "react-native";
import ProfileDetails from "../components/ProfileDetails";

export default (Profile = () => {
  const { authcontext, loginState } = React.useContext(AuthContext);
  const { signOut } = authcontext;

  console.log("From Profile....", loginState.user);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProfileDetails 
        name={loginState.user.name} 
        profilePic={loginState.user.photoUrl} 
        username='lorem'
        bio='This is my bio dude'
      />
      <Button
        icon={
          <Icon
            name="sign-out"
            size={15}
            color="white"
            style={{ padding: 10 }}
          />
        }
        title="Sign out"
        onPress={signOut}
      />
    </SafeAreaView>
  );
});

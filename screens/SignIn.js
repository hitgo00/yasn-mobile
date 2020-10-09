import React from "react";
import { View, Button } from "react-native";
import * as Google from "expo-google-app-auth";
import { AuthContext } from "../components/context";
import { SocialIcon, Text } from "react-native-elements";

export default function SignIn() {
  const { authcontext } = React.useContext(AuthContext);
  const { signIn } = authcontext;

  const signInWithGoogleAsync = async () => {
    try {
      console.log("Try..");
      const result = await Google.logInAsync({
        //  behavior: "web",
        androidClientId:
          "688257914681-hvulaq80h91s1e983ig4m97fphg2h6k6.apps.googleusercontent.com",
        iosClientId:
          "688257914681-j8449v1oqtpi4f5jo1ugcs2eav86ujbg.apps.googleusercontent.com",
        scopes: ["profile", "email"],
        hostedDomain: "daiict.ac.in",
      });

      if (result.type === "success") {
        signIn(result);
        //console.log(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text h1>Connect</Text>
      <Text style={{ marginTop: 30 }}>It's exclusive!</Text>
      <SocialIcon
        style={{ padding: 10, margin: 10 }}
        title="Sign In With Google"
        button
        type="google"
        onPress={signInWithGoogleAsync}
      />
      <Text>Using @daiict.ac.in email.</Text>
    </View>
  );
}

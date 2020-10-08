import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { AsyncStorage } from "react-native";
import { AuthContext } from "../components/context";

export default function Loading(props) {
  const { authcontext, loginState } = React.useContext(AuthContext);
  const { Retrive } = authcontext;
  AsyncStorage.getItem("userToken", (err, result) => {
    if (result) {
      AsyncStorage.getItem("user", (err, res) => {
        console.log("Loading Screen..");
        console.log(result);
        if (!loginState.user) {
          Retrive(JSON.parse(res), result);
        }

        props.navigation.navigate("DashBoard");
      });
    } else {
      props.navigation.navigate("LogInScreen");
    }
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

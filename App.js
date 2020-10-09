import React, { lazy } from "react";
import { AsyncStorage } from "react-native";
import { render } from "react-dom";
import { View } from "react-native";
import DashBoard from "./Home.js";
import LogInScreen from "./screens/SignIn";
import LoadingScreen from "./screens/Loading";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { AuthContext } from "./components/context";

export default function App() {
  const AppSwitchNavigator = createSwitchNavigator({
    LoadingScreen: LoadingScreen,
    LogInScreen: LogInScreen,
    DashBoard: DashBoard,
  });

  const AppNavigator = createAppContainer(AppSwitchNavigator);

  const initialLoginState = {
    user: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...prevState,
          user: action.user,
          userToken: action.token,
        };
      case "LOGOUT":
        return {
          ...prevState,
          user: null,
          userToken: null,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authcontext = React.useMemo(
    () => ({
      signIn: async (result) => {
        const Token = result.accessToken;
        const user = result.user;

        try {
          await AsyncStorage.setItem("userToken", Token);
          await AsyncStorage.setItem("user", JSON.stringify(user));
        } catch (e) {
          console.log(e);
        }
        AsyncStorage.getItem("user", (err, res) => {
          console.log("From SignIn from Storage : ", JSON.parse(res));
        });
        dispatch({ type: "LOGIN", user: user, token: Token });
      },
      signOut: async () => {
        try {
          console.log("called");
          await AsyncStorage.removeItem("userToken");
          await AsyncStorage.removeItem("user");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      Retrive: (user, userToken) => {
        dispatch({ type: "LOGIN", user: user, token: userToken });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={{ authcontext, loginState }}>
      <AppNavigator />
    </AuthContext.Provider>
  );
}

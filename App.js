import React, { useEffect } from "react";
import { AsyncStorage,ActivityIndicator } from "react-native";
import { render } from "react-dom";
import { View } from "react-native";
import DashBoard from "./Home.js";
import LogInScreen from "./screens/SignIn";
import { AuthContext } from "./components/context";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {store} from "./store";
import { StoreProvider } from 'easy-peasy';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3f51b5',
    accent: '#f1c40f',
  },
};

export default function App() {

  const initialLoginState = {
    user: null,
    userToken: null,
    isLoading: true,
    nickname: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...prevState,
          user: action.user,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          user: null,
          userToken: null,
          isLoading: false,
          nickname:null
        };
      case "SetNickname":
       
        return{
          ...prevState,
          nickname:action.name,
        }

    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authcontext = React.useMemo(
    () => ({
      signIn: async (result) => {
        const Token = result.idToken;
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
          await AsyncStorage.removeItem("nickname");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      Retrive: (user, userToken) => {
        dispatch({ type: "LOGIN", user: user, token: userToken });
      },
      SetNickname: async (name)=>{
        try{
          await AsyncStorage.setItem("nickname",name);
         
          dispatch({type:"SetNickname",name});
        }
        catch(e){
          console.log(e);
        }
        
      },
    }),
    []
  );

  useEffect(()=>{
    async function fetchData(){
      const userToken= await AsyncStorage.getItem("userToken");
      if(userToken){
          const rawUser=await AsyncStorage.getItem("user");
          const user=JSON.parse(rawUser);
          dispatch({ type: "LOGIN", user: user, token: userToken });
          const name=await AsyncStorage.getItem("nickname");
          dispatch({type:"SetNickname",name});
      }
      else{
        dispatch({type:"LOGIN",user:null,token:null});
      }
    }
    fetchData();
},[]);
  

  if(loginState.isLoading){
    return(
      <PaperProvider theme={theme}>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
      </PaperProvider>
    );
  }

  return (
    
    <PaperProvider theme={theme}>
    <StoreProvider store={store}>
    <AuthContext.Provider value={{ authcontext, loginState }}>
      {loginState.userToken!==null? <DashBoard/> : <LogInScreen/>}
    </AuthContext.Provider>
    </StoreProvider>
    </PaperProvider>
   
  );
}

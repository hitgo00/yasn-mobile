import React, { useEffect, useState } from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { render } from 'react-dom';
import { View, Alert } from 'react-native';
import DashBoard from './Home.js';
import LogInScreen from './screens/SignIn';
import { AuthContext } from './components/context';
import {
  DefaultTheme,
  Provider as PaperProvider,
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  TextInput,
  HelperText,
  Card,
} from 'react-native-paper';
import { store } from './store';
import { StoreProvider } from 'easy-peasy';
import axios from 'axios';
import queryString from 'query-string';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  mode: 'dark',
  colors: {
    ...DefaultTheme.colors,
    primary: '#000',
    accent: '#f1c40f',
  },
};

export default function App() {
  const API_URL = 'https://connectda.herokuapp.com';

  const initialLoginState = {
    user: null,
    userToken: null,
    isLoading: true,
    nickname: null,
    userDetails_server: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          user: action.user,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          user: null,
          userToken: null,
          isLoading: false,
          nickname: null,
        };
      case 'SetNickname':
        return {
          ...prevState,
          nickname: action.name,
        };

      case 'SetUserDetails_server':
        return {
          ...prevState,
          userDetails_server: action.userDetails,
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
        const Token = result.idToken;
        const user = result.user;

        try {
          await AsyncStorage.setItem('userToken', Token);
          await AsyncStorage.setItem('user', JSON.stringify(user));
        } catch (e) {
          console.log(e);
        }
        AsyncStorage.getItem('user', (err, res) => {
          console.log('From SignIn from Storage : ', JSON.parse(res));
        });
        dispatch({ type: 'LOGIN', user: user, token: Token });
      },
      signOut: async () => {
        try {
          console.log('called');
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('user');
          await AsyncStorage.removeItem('nickname');
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: 'LOGOUT' });
      },
      Retrive: (user, userToken) => {
        dispatch({ type: 'LOGIN', user: user, token: userToken });
      },
      SetNickname: async (name) => {
        try {
          await AsyncStorage.setItem('nickname', name);

          dispatch({ type: 'SetNickname', name });
        } catch (e) {
          console.log(e);
        }
      },
      SetUserDetails_server: (details) => {
        dispatch({ type: 'SetUserDetails_server', userDetails: details });
      },
    }),
    []
  );

  useEffect(() => {
    async function fetchData() {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        const rawUser = await AsyncStorage.getItem('user');
        const user = JSON.parse(rawUser);
        const name = await AsyncStorage.getItem('nickname');
        dispatch({ type: 'SetNickname', name });
        dispatch({ type: 'LOGIN', user: user, token: userToken });
      } else {
        dispatch({ type: 'LOGIN', user: null, token: null });
      }
    }
    fetchData();
  }, []);

  if (loginState.isLoading) {
    return (
      <PaperProvider theme={theme}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" />
        </View>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <StoreProvider store={store}>
          <AuthContext.Provider value={{ authcontext, loginState }}>
            {loginState.userToken === null ? <LogInScreen /> : <DashBoard />}
          </AuthContext.Provider>
        </StoreProvider>
      </View>
    </PaperProvider>
  );
}

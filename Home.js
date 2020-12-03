import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from './screens/Feed';
import Profile from './screens/Profile';
import Chat from './screens/Chat';
import AddPost from './screens/AddPost';
import { Container, Text, Content, Header, Body } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from './components/context';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { Provider, Modal, Portal } from 'react-native-paper';
import UserDetailForm from './components/UserDetailForm';
import axios from 'axios';
import queryString from 'query-string';

const Tab = createBottomTabNavigator();

export default function Home() {
  const { authcontext, loginState } = React.useContext(AuthContext);
  const { signOut, SetUserDetails_server } = authcontext;

  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState(false);
  const [visible, setVisible] = useState(false);

  const API_URL = 'https://connectda.herokuapp.com';

  useEffect(() => {
    console.log('Get request Again..');
    axios
      .get(
        `${API_URL}/checkprofile?` +
          queryString.stringify(
            { email: loginState.user.email, googleToken: loginState.userToken },
            { withCredentials: true }
          )
      )
      .then((res) => {
        console.log('response : ', res.data);
        if (res.data === 'invalid token') {
          console.log('Yess Called...');
          signOut();
        } else if (res.data === false) {
          setLoading(false);
          setVisible(true);
        } else {
          SetUserDetails_server(res.data[0]);
          setLoading(false);
          setVisible(false);
          setProfile(true);
        }
      });
  }, [visible]);

  return (
    <NavigationContainer>
      <Header
        style={{
          backgroundColor: '#fff',
          borderBottomEndRadius: 21,
          borderBottomStartRadius: 21,
        }}
      >
        <Body>
          <Text style={{ color: 'black', fontSize: 24 }}>YASN</Text>
        </Body>
      </Header>

      {isLoading ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          size="large"
        />
      ) : profile ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Feed') {
                iconName = focused ? 'ios-compass' : 'ios-compass';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'ios-contact' : 'ios-contact';
              } else if (route.name === 'AddPost') {
                iconName = focused ? 'ios-add-circle' : 'ios-add-circle';
              } else if (route.name === 'Chat') {
                iconName = focused ? 'ios-chatboxes' : 'ios-chatboxes';
              }
              // You can return any component that you like here!
              return (
                <Icon
                  name={iconName}
                  size={28}
                  color={focused ? 'black' : color}
                />
              );
            },
          })}
          tabBarOptions={{
            activeTintColor: '#208af5',
            inactiveTintColor: '#D0D0D0',
            style: {
              marginHorizontal: 8,
              marginBottom: 3,
              borderRadius: 14,
              position: 'absolute',
            },
            labelStyle: {
              color: 'black',
            },
          }}
        >
          <Tab.Screen name="Feed" component={Feed} />
          <Tab.Screen name="AddPost" component={AddPost} />
          <Tab.Screen name="Chat" component={Chat} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      ) : (
        <Provider>
          <Portal>
            <Modal visible={visible}>
              <UserDetailForm
                email={loginState.user.email}
                googleToken={loginState.userToken}
                myFun={(val) => {
                  setVisible(val);
                }}
              />
            </Modal>
          </Portal>
        </Provider>
      )}
    </NavigationContainer>
  );
}

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from './screens/Feed';
import Profile from './screens/Profile';
import Chat from './screens/Chat';
import AddPost from './screens/AddPost';
import { Container, Text, Content, Header, Body } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Header>
        <Body>
          <Text>Connect</Text>
        </Body>
      </Header>
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
            return <Icon name={iconName} size={28} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#208af5',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="AddPost" component={Profile} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Profile" component={AddPost} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

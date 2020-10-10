import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Text, Container } from 'native-base';
import UserDetailsForm from '../components/userDetailsForm/UserDetailsForm';

export default (Profile = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Text>Hello, Add Post from Here!</Text>
        <Text>Sample User details form</Text>
        <UserDetailsForm/>
      </Container>
    </SafeAreaView>
  );
});

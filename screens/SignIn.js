import React from 'react';
import { View, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { AuthContext } from '../components/context';
import { SocialIcon, Text } from 'react-native-elements';
import { Android_ID, IOS_ID } from '@env';

export default function SignIn() {
  const { authcontext } = React.useContext(AuthContext);
  const { signIn } = authcontext;

  const signInWithGoogleAsync = async () => {
    try {
      console.log('Try..');
      const result = await Google.logInAsync({
        behavior: 'web',
        androidClientId: Android_ID,
        iosClientId: IOS_ID,
        scopes: ['profile', 'email'],
        hostedDomain: 'daiict.ac.in',
        androidStandaloneAppClientId: Android_ID,
      });

      if (result.type === 'success') {
        console.log(result);
        if (result.user.email.split('@')[1] !== 'daiict.ac.in') {
          alert('Please use @daiict.ac.in email only');
          return { cancelled: true };
        } else {
          signIn(result);
        }

        return result.idToken;
      } else {
        console.log('error');
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e);
      return { error: true };
    }
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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

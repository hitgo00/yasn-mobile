import * as React from 'react';
import * as Google from 'expo-google-app-auth';
import { Text, Button } from 'native-base';
export default async function GoogleSignIn() {
  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: '',
        iosClientId: '',
        scopes: ['profile', 'email'],
        hosted_domain: 'daiict.ac.in',
      });
      console.log(result);
      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  return <Button onPress={signInWithGoogleAsync}>Google SignIn</Button>;
}

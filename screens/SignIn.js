import React from 'react';
import { View, ImageBackground } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { AuthContext } from '../components/context';
import { SocialIcon, Text } from 'react-native-elements';
import { Android_ID, IOS_ID } from '@env';
import BackgroundS from '../components/BackgroundS';

const image = {
  uri:
    'https://res.cloudinary.com/hitgo/image/upload/v1606861612/BackgroundS_wxglzf.jpg',
};
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
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'between',
      }}
    >
      <ImageBackground
        source={image}
        style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: 'Poppins',
              fontWeight: 'bold',
              fontSize: 48,
              color: 'white',
              textAlign: 'center',
              marginTop: 140,
            }}
          >
            Welcome to YASN.
          </Text>
          <Text
            style={{
              marginTop: 30,
              textAlign: 'center',
              marginLeft: 24,
              marginRight: 24,
              fontFamily: 'Poppins, Roboto',
              fontSize: 16,
              color: 'white',
            }}
          >
            Missing out on the awesome things happening at DAIICT? Say no more!
            We’ve got you covered. YASN connects you to the campus in a super
            cool way.
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 14,
          }}
        >
          <SocialIcon
            style={{
              padding: 10,
              backgroundColor: 'transparent',
              borderColor: 'white',
              borderWidth: 2,
              borderRadius: 10,
            }}
            title="Sign In With Google"
            button
            type="google"
            onPress={signInWithGoogleAsync}
          />
          <Text
            style={{
              fontWeight: '500',
              margin: 10,
              marginLeft: 14,
              marginRight: 14,
              color: 'white',
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            YASN love all! YASN doesn’t discriminate.{'\n'} All you need is a
            @daiict.ac.in to get in 😉
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

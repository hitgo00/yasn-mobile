import React, { Fragment } from 'react';
import { Container } from 'native-base';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../components/context';
import { AsyncStorage } from 'react-native';
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  TextInput,
  HelperText,
  Card,
  ActivityIndicator,
} from 'react-native-paper';
import * as yup from 'yup';
import { Formik } from 'formik';
import MultiSelect from 'react-native-multiple-select';
import axios from 'axios';
import queryString from 'query-string';
import ProfileCard from '../components/ProfileCard';
import UserDetailForm from '../components/UserDetailForm';
//import {API_URL} from "@env";

export default (Profile = () => {
  const { authcontext, loginState } = React.useContext(AuthContext);
  const { signOut } = authcontext;

  const [visible, setVisible] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({});
  //  const [clubComm, setclubComm]=React.useState([]);

  const email = loginState.user.email;
  const googleToken = loginState.userToken;
  const API_URL = 'https://connectda.herokuapp.com';
  console.log(API_URL);

  React.useEffect(() => {
    console.log('Get request Again..');
    axios
      .get(
        `${API_URL}/checkprofile?` +
          queryString.stringify(
            { email, googleToken },
            { withCredentials: true }
          )
      )
      .then((res) => {
        // cookies.set('userDetails', res.data[0]);
        console.log(res.data);
        if (res.data === 'invalid token') {
          Alert.alert('Your Session is Expired', 'Please Login Again.');
        } else if (res.data === false) {
          setVisible(true);
        } else {
          setUserDetails(res.data[0]);
          setVisible(false);
        }
      });
  }, [visible]);

  console.log('From Profile....', loginState.user);
  console.log('User_Details: ', userDetails);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
      }}
    >
      <View style={{ flex: 1, paddingBottom: 70 }}>
        {userDetails.email ? (
          <ProfileCard
            name={userDetails.name}
            clubs={userDetails.clubsNumber}
            roll={userDetails.email.split('@')[0]}
            bio={userDetails.bio}
            posts={userDetails.posts}
            github={userDetails.gitHubUrl}
            linkedin={userDetails.linkedInUrl}
            instagram={userDetails.instaUrl}
            username={userDetails.username}
          />
        ) : (
          <ActivityIndicator animating={true} />
        )}
        <Button
          type="dark"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'white',
          }}
          mode="outlined"
          // icon="power"
          onPress={signOut}
        >
          <Text style={{ color: '#fff' }}>Sign Out</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
});

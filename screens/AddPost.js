import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Text, Container } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../components/context';
import {
  Card,
  Button,
  TextInput,
  HelperText,
  CardMedia,
  Title,
} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import axios from 'axios';
import queryString from 'query-string';
import { API_URL, Cloud, Preset } from '@env';
import { Video } from 'expo-av';

const tags = [
  { label: 'Project', value: 'Project' },
  { label: 'Artwork', value: 'Artwork' },
  { label: 'Writings', value: 'Writings' },
  { label: 'Music', value: 'Music' },
  { label: 'Dance', value: 'Dance' },
  { label: 'Other', value: 'Other' },
];

export default (Profile = () => {
  const { loginState, authcontext } = React.useContext(AuthContext);
  console.log('MY Attr : ', Cloud, Preset);

  const email = loginState.user.email;
  const googleToken = loginState.userToken;
  const user_id = email.split('@')[0];

  const [IV, setImage] = useState(null);
  const [loading, setLoad] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  // Code for Image/Video Picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result);
    }
  };

  const InitialValues = {
    title: '',
    description: '',
    tag: '',
  };

  const [values, setValue] = useState(InitialValues);
  const [error, setError] = useState(true);
  const [showDropDown, setShowDropDown] = useState(false);

  const onSubmit = async () => {
    if (!error) {
      console.log(values);
      if (IV === null) {
        Alert.alert('Please Select An Image');
      } else {
        setLoad(true);
        console.log(IV);
        var inx = IV.uri.lastIndexOf('.');
        let file = {
          uri: IV.uri,
          type: `test/${IV.uri.slice(inx + 1)}`,
          name: `test.${IV.uri.slice(inx + 1)}`,
        };
        console.log('file : ', file);
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', Preset);
        data.append('cloud_name', Cloud);
        data.append('folder', 'daconnect');

        fetch(`https://api.cloudinary.com/v1_1/${Cloud}/${IV.type}/upload/`, {
          method: 'post',
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            let ImageUrl = null;
            let VideoUrl = null;
            if (IV.type === 'image') {
              const arr1 = data.url.split('/');
              ImageUrl = arr1[arr1.length - 2] + '/' + arr1[arr1.length - 1];
            } else {
              const arr2 = data.url.split('/');

              VideoUrl = arr2[arr2.length - 2] + '/' + arr2[arr2.length - 1];
            }

            console.log('Url : ', VideoUrl, ImageUrl);
            if (VideoUrl || ImageUrl) {
              console.log(
                email,
                googleToken,
                user_id,
                values.title,
                values.tag,
                values.description
              );
              axios
                .post(
                  `${API_URL}/addpost?` +
                    queryString.stringify({ email, googleToken }),
                  {
                    title: values.title,
                    tags: values.tag,
                    description: values.description,

                    imageUrl: ImageUrl,
                    videoUrl: VideoUrl,
                  }
                )
                .then(function(res) {
                  setLoad(false);
                  if (res.data === 'successfully added post') {
                    Alert.alert('Post Uploaded Successfully.');
                    console.log('yessss...');
                  } else {
                    console.log(res.data);
                  }
                })
                .catch(function(error) {
                  console.log('Oh no! ', error);
                  setLoad(false);
                });
            } else {
              Alert.alert('error while uploading.');
              setLoad(false);
            }
          })
          .catch((err) => {
            Alert.alert(err);
            setLoad(false);
          });
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container
        style={{
          justifyContent: 'center',
          backgroundColor: '#000',
          paddingVertical: 70,
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          <Card
            elevation={2}
            style={{
              marginLeft: 20,
              marginRight: 20,
              padding: 5,
              borderRadius: 14,
            }}
          >
            <TextInput
              style={{
                marginTop: 10,
                marginRight: 10,
                marginLeft: 10,
                color: 'white',
              }}
              label="Title"
              value={values.title}
              onChangeText={(text) => {
                setValue({ ...values, title: text });
                if (text === '') {
                  setError(true);
                } else {
                  setError(false);
                }
              }}
              mode="outlined"
            />
            <HelperText type="error" visible={error}>
              Title can't be blank
            </HelperText>

            <TextInput
              style={{ margin: 10 }}
              label="Description"
              value={values.description}
              onChangeText={(txt) => {
                setValue({ ...values, description: txt });
              }}
              mode="outlined"
            />

            <SafeAreaView style={{ margin: 10 }}>
              <DropDown
                label={'Select Tag'}
                mode={'outlined'}
                value={values.tag}
                setValue={(val) => {
                  setValue({ ...values, tag: val });
                }}
                list={tags}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                inputProps={{
                  right: <TextInput.Icon name={'menu-down'} />,
                }}
              />
            </SafeAreaView>

            <Button
              icon={IV === null ? 'camera' : 'check-circle'}
              mode="Outlined"
              style={{ padding: 5, alignContent: 'center' }}
              onPress={pickImage}
            >
              Select
            </Button>

            {IV !== null && IV.type === 'image' ? (
              <Card.Cover
                source={{ uri: IV.uri }}
                style={{ width: 250, height: 250, marginLeft: '15%' }}
              />
            ) : null}

            {IV !== null && IV.type !== 'image' ? (
              <Video
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={{ width: 250, height: 250, marginLeft: '15%' }}
                source={{ uri: IV.uri }}
              />
            ) : null}
            <Button
              mode="contained"
              loading={loading}
              style={{ padding: 2, margin: 5, alignContent: 'center' }}
              onPress={onSubmit}
            >
              Post
            </Button>
          </Card>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
});

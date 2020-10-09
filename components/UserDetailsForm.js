import React, { useState } from 'react';
import { Input, Button, Text } from 'react-native-elements';
import { ActivityIndicator, Image, ScrollView, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Icon, Picker } from 'native-base';


const formSchema = yup.object({
  name: yup.string().required('Required'),
  username: yup.string()
    .max(20, 'Too Long!')
    .required('Required'),
  bio: yup.string(),
  linkedInUrl: yup.string(),
  githubUrl: yup.string(),
  instaUrl: yup.string(),
})

export default function UserDetailsForm(props) {
  const [clubComm, setClubComm] = useState('');
  const [AllClubComm, setAllClubComm] = useState([])
  const onValueChange = (value) =>{
    setClubComm(value)
  }  
  
  return (
      <Formik
        initialValues={{
          name: '',
          username: '',
          bio: '',
          linkedInUrl: '',
          githubUrl: '', 
          instaUrl: '',
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        {(props) => (
          <>
            <ScrollView style={styles.formView}>
              <Input
                placeholder="Name"
                onChangeText={props.handleChange('name')}
                style={styles.inputStyle}
                value={props.values.name}
                onBlur={props.handleBlur('name')}
                errorMessage={
                  props.touched.name && props.errors.name
                }
              />
              <Input
                placeholder="Username"
                onChangeText={props.handleChange('username')}
                style={styles.inputStyle}
                value={props.values.username}
                onBlur={props.handleBlur('username')}
                errorMessage={
                  props.touched.username && props.errors.username
                }
              />
              <Input
                style={{backgroundColor: '#dbdbdb', ...styles.inputStyle}}
                placeholder="Github URL"
                onChangeText={props.handleChange('githubUrl')}
                value={props.values.githubUrl}
                onBlur={props.handleBlur('githubUrl')}
                errorMessage={
                  props.touched.githubUrl && props.errors.githubUrl
                }
              />
              <Input
                style={{backgroundColor: '#dbdbdb', ...styles.inputStyle}}
                placeholder="LinkedIn URL"
                onChangeText={props.handleChange('linkedInUrl')}
                value={props.values.linkedInUrl}
                onBlur={props.handleBlur('linkedInUrl')}
                errorMessage={
                  props.touched.linkedInUrl && props.errors.linkedInUrl
                }
              />
              <Input
                style={{backgroundColor: '#dbdbdb', ...styles.inputStyle}}
                placeholder="Instagram URL"
                onChangeText={props.handleChange('instaUrl')}
                value={props.values.instaUrl}
                onBlur={props.handleBlur('instaUrl')}
                errorMessage={
                  props.touched.instaUrl && props.errors.instaUrl
                }
              />
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={clubComm}
                onValueChange={onValueChange}
              >
                <Picker.Item label="Add Club" value="Add Club" />
                <Picker.Item label="Sports Committee" value="Sports Committee" />
                <Picker.Item label="Music Club" value="Music Club" />
                <Picker.Item label="Programming Club" value="Programming Club" />
              </Picker>
              <Input
                placeholder="BIO"
                style={styles.inputStyle}
                multiline
                numberOfLines={3}
                onChangeText={props.handleChange('bio')}
                value={props.values.bio}
                onBlur={props.handleBlur('bio')}
                errorMessage={
                  props.touched.bio && props.errors.bio
                }
              />
              <Button 
                title='Submit'
                onPress={props.handleSubmit}
              />
            </ScrollView>
          </>
        )}
      </Formik>
  )
}

const styles = StyleSheet.create({
  formView: {
    margin: 10,
  },
  inputStyle: {
    marginBottom: 1
  }
})
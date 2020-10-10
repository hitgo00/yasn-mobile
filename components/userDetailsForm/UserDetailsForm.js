import React, { useState } from 'react';
import { Input, Button, Text } from 'react-native-elements';
import { ActivityIndicator, Image, ScrollView, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik';
import MultiSelect from 'react-native-multiple-select';
import * as yup from 'yup';
import { Icon, Picker, View } from 'native-base';
import { tags } from './constants';


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
  const [selectedItems, setSelectedItems] = useState([]);
  const onValueChange = (value) =>{
    setClubComm(value)
  }  

  const onSelectedItemsChange = selectedItems => {
    setSelectedItems(selectedItems)
  };
  
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
          values.clubsComm = selectedItems;
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
              <MultiSelect
                styleMainWrapper={{paddingHorizontal: 10}}
                hideTags
                items={tags}
                uniqueKey="name"
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText="Add Clubs/Committees"
                searchInputPlaceholderText="Search..."
                onChangeInput={ (text)=> console.log(text)}
                altFontFamily="ProximaNova-Light"
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#CCC' }}
                submitButtonColor="#ff8282"
                submitButtonText="Done"
              />
              <View style={{flexWrap: 'wrap', justifyContent: 'space-evenly',flexDirection: 'row', paddingHorizontal: 10}}>
                {selectedItems.map(item => (
                  <View style={{borderWidth: 2, borderRadius: 10, padding: 5, margin: 2}}>
                    <Text style={{fontSize: 17}}>{item}</Text>
                  </View>
                ))}
              </View>
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
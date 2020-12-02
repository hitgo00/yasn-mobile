import React from 'react';
import { Formik } from 'formik';
import { TextInput } from 'react-native-paper';
import { Input, View, Icon } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import queryString from 'query-string';

export default function AddComment(props) {
  const API_URL = 'https://connectda.herokuapp.com';
  const styles = StyleSheet.create({
    Section: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      marginVertical: 10,
      borderRadius: 14,
      paddingHorizontal: 7,
    },
    searchIcon: {
      padding: 10,
    },
    input: {
      flex: 1,
      margin: 5,
      backgroundColor: 'white',
      color: 'white',
    },
  });
  return (
    <Formik
      initialValues={{ comment: '' }}
      onSubmit={(values, { resetForm }) => {
        if (values.comment) console.log(values);
        axios
          .post(
            `${API_URL}/addcomment?` +
              queryString.stringify(
                { googleToken: props.googleToken, email: props.email },
                { withCredentials: true }
              ),
            {
              comment: values.comment,
              postId: props.postId,
              username: props.username,
              userId: props.userId,
              name: props.name,
            }
          )
          .then(function(res) {
            if (res.data === 'success') {
              console.log('comment added!');
              const obj = {
                name: props.name,
                comment: values.comment,
                date: new Date(),
              };
              props.handleComment(obj);
              resetForm();
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }}
    >
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
      }) => (
        <View style={styles.Section}>
          <TextInput
            style={styles.input}
            value={values.comment}
            onChangeText={handleChange('comment')}
            onBlur={() => setFieldTouched('comment')}
            placeholder="Add a comment"
          />
          <Icon name="send" size={20} color="#fff" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
}

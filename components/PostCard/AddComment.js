import React from 'react'
import { Formik } from 'formik';
import {TextInput} from 'react-native-paper'
import {Input, View,Icon } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import {StyleSheet} from "react-native";

export default function AddComment(props) {
    const styles=StyleSheet.create({
        Section: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
        },
        searchIcon: {
            padding: 10,
        },
        input: {
            flex: 1,
            margin:5,
            backgroundColor: '#fff',
            color: '#424242',
        },
    })
    return (
        <Formik
            initialValues={{comment:""}}
            onSubmit={(values)=>{if(values.comment) 
                                    console.log(values)
                                }
                            }
        >
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit })=>(
                <View style={styles.Section}>
                    <TextInput
                        style={styles.input}
                        value={values.comment}
                        onChangeText={handleChange('comment')}
                        onBlur={() => setFieldTouched('comment')}
                        placeholder="Add Comment"
                    />
                     <Icon  name="send" size={20} color="#000" onPress={handleSubmit}/>
                </View>
            )}
        </Formik>
    )
}

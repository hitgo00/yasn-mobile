import React from 'react';
import { Card, CardItem, Container, Icon, Text } from 'native-base';
import { ActivityIndicator, Image, ScrollView, StyleSheet,Linking } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {Avatar} from "react-native-paper";

export default function ProfileDetails(props) {
  return (
    <ScrollView>
      <Card style={styles.container}>
        <Avatar.Text size={60} label={props.name[0]} style={{margin:10}}/>
        <Text style={{fontSize: 23, fontWeight:'bold'}}>{props.name}</Text>
        <Text style={{fontSize: 17, padding: 1}}>{props.username}</Text>
        <Text style={{fontSize: 17, padding: 10}}>{props.bio}</Text>
        <CardItem>
            {props.github?(
                <AntDesign style={styles.socialIcon} name="github" size={40} color="#211F1F" onPress={() => Linking.openURL(props.github)} />
            ):null}
            {props.linkedin?(
                <AntDesign style={styles.socialIcon} name="linkedin-square" size={40} color="#211F1F" onPress={() => Linking.openURL(props.linkedin)} />
            ):null}
            {props.instagram?(
                <AntDesign style={styles.socialIcon} name="instagram" size={40} color="#211F1F" onPress={() => Linking.openURL(props.instagram)} />
            ):null}
        </CardItem>
        <CardItem style={styles.line}></CardItem>
        <CardItem>
          <CardItem style={styles.details}>
            <Text style={{fontSize: 17, paddingBottom: 10}}>Posts</Text>
            <Text style={{fontSize: 30, fontWeight:'bold'}}>{props.posts.length}</Text>
          </CardItem>
          <CardItem style={styles.details}>
            <Text style={{fontSize: 17, paddingBottom: 10}}>Clubs/Comm</Text>
            <Text style={{fontSize: 30, fontWeight:'bold'}}>{props.clubs}</Text>
          </CardItem>
        </CardItem>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    
  },
  socialIcon:{
    paddingHorizontal: 20,
  },
  line:{
    borderTopWidth: 2,
    padding: 0,
    width: 300,
    marginTop: 20,
    marginBottom: 0,
    borderColor: '#bdbcbb',
    borderRadius: 10
  },  
  details: {
    flexDirection: 'column',
    marginLeft: 10,
    marginRight:10
  }
}) 
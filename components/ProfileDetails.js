import React from 'react';
import { Card, CardItem, Container, Icon, Text } from 'native-base';
import { ActivityIndicator, Image, ScrollView, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function ProfileDetails(props) {
  return (
    <ScrollView>
      <Card style={styles.container}>
        <Image
          source={{ uri: props.profilePic }}
          style={styles.profilePic}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={{fontSize: 23, fontWeight:'bold'}}>{props.name}</Text>
        <Text style={{fontSize: 17, padding: 5}}>{props.username}</Text>
        <Text style={{fontSize: 17, paddingBottom: 10}}>{props.bio}</Text>
        <CardItem>
          <AntDesign style={styles.socialIcon} name="github" size={40} color="black" />
          <AntDesign style={styles.socialIcon} name="linkedin-square" size={40} color="black" />
          <AntDesign style={styles.socialIcon} name="instagram" size={40} color="black" />
        </CardItem>
        <CardItem style={styles.line}></CardItem>
        <CardItem>
          <CardItem style={styles.details}>
            <Text style={{fontSize: 17, paddingBottom: 10}}>Posts</Text>
            <Text style={{fontSize: 30, fontWeight:'bold'}}>7</Text>
          </CardItem>
          <CardItem style={styles.details}>
            <Text style={{fontSize: 17, paddingBottom: 10}}>Clubs/Comm</Text>
            <Text style={{fontSize: 30, fontWeight:'bold'}}>4</Text>
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
    padding: 0
  },
  profilePic: { 
    margin: 28,
    width: 150, 
    height: 150, 
    borderRadius: 100 
  },
  socialIcon:{
    paddingHorizontal: 20,
  },
  line:{
    borderTopWidth: 2,
    padding: 0,
    width: 300,
    marginTop: 30,
    marginBottom: 0,
    borderColor: '#bdbcbb',
    borderRadius: 10
  },  
  details: {
    flexDirection: 'column',
    margin: 10
  }
})
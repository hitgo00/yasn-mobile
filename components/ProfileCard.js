import React from 'react';
import { Card, CardItem, Container, Icon, Text } from 'native-base';
import { ActivityIndicator, Image, ScrollView, StyleSheet,Linking } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {Avatar} from 'react-native-elements';

export default function ProfileDetails(props) {
  return (
    <ScrollView style={{backgroundColor:'#E5E5E5'}}>
      <Card style={styles.container}>
        <View style = {styles.card}>
          <Text style={styles.card_name}>{props.name}</Text>
          <Text style={styles.card_bio}>{props.bio}</Text>
          <Avatar rounded title={props.username} style={styles.avatar}/>
        </View>

        <View style = {styles.social}>
        {props.github?(
                <AntDesign style={styles.socialIcon} name="github" size={40} color="#211F1F" onPress={() => Linking.openURL(props.github)} />
            ):null}
            {props.linkedin?(
                <AntDesign style={styles.socialIcon} name="linkedin-square" size={40} color="#211F1F" onPress={() => Linking.openURL(props.linkedin)} />
            ):null}
            {props.instagram?(
                <AntDesign style={styles.socialIcon} name="instagram" size={40} color="#211F1F" onPress={() => Linking.openURL(props.instagram)} />
            ):null}
        </View> 
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    flex:1,
    backgroundColor:'#E5E5E5'
  },
  socialIcon:{
    paddingHorizontal: 20,
    fontSize: 42,
    marginLeft: 39,
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
  },
  card:{
    backgroundColor:'black',
    height:291,
    width: 339,
    position: 'absolute',
    top: 50,
    left: 37,
    shadowColor: 'darkgray',
    shadowOffset: {
      width: 0,
      height: 1,
     },
    shadowOpacity: 0.30,
    elevation: 3,
    borderRadius: 30,
  },
  card_name:{
    color:'white',
    fontSize: 40,
    fontWeight: "bold",
    left: 53,
    top: 20
  },
  card_bio:{
    color:'white',
        fontSize: 24,
        textAlign: "center",
        top: 36
  },
  avatar:{
    height:222,
    width:222,
    borderRadius: 500,
    shadowColor: '#000',
    shadowOpacity: 0.37,
    shadowOffset: {
          height: 6,
          width: 0
        },
        shadowRadius: 6.27,
        position: "absolute",
        top: 157,
        left: 60
  },
  icon:{
    height:45,
    width:45,
    top: 145,
    borderRadius: 30
  },
  social:{
    height: 72,
        width: 260,
        backgroundColor: 'white',
        left: 6,
        top: 130,
        marginTop:325,
        justifyContent: "center",
        flexDirection:"row",
        alignContent: "space-between",

        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
        borderRadius:5
  },
  post:{
    height:242,
    width:343,
    left: 1,
    borderRadius: 20,
    marginTop:125
  }
  
}
  ) 

import React,{Fragment} from "react";
import { Container } from "native-base";
import { StyleSheet, View, SafeAreaView ,Alert,ScrollView} from "react-native";
import {  Image } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../components/context";
import { AsyncStorage} from "react-native";
import { Modal, Portal, Text, Button, Provider,TextInput,HelperText,Card, ActivityIndicator } from 'react-native-paper';
import * as yup from 'yup';
import { Formik } from 'formik';
import  MultiSelect  from 'react-native-multiple-select';
import axios from 'axios';
import queryString from 'query-string';
import ProfileCard from "../components/ProfileCard";
//import {API_URL} from "@env";



export default (Profile = () => {
  const { authcontext, loginState } = React.useContext(AuthContext);
  const { signOut } = authcontext;

  const [visible, setVisible] = React.useState(false);
  const [userDetails,setUserDetails]=React.useState({});
  const [clubComm, setclubComm]=React.useState([]);

  const email=loginState.user.email;
  const googleToken=loginState.userToken;
  const API_URL="https://connectda.herokuapp.com"
  console.log(API_URL);
   
  React.useEffect(()=>{
    console.log("Get request Again..");
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
          Alert.alert("Your Session is Expired","Please Login Again.");
        }
        else if (res.data===false) {
          setVisible(true);
        }
        else{
          setUserDetails(res.data[0]);
          setVisible(false);
        }
      });
  },[visible]);
  

//  console.log("From Profile....", loginState.user,googleToken);

  const tags=[
    {id:"DSC",name:'DSC'},
    {id:"DTG",name:'DTG'},
    {id:"DADC",name:'DADC'},
    {id:"Music Club",name:'Music Club'},
    {id:"Press Club",name:'Press Club'},
    {id:"PMMC",name: 'PMMC'},
    {id:"Cubing Club",name:'Cubing Club'},
    {id:"Heritage club",name:'Heritage club'},
    {id:"EHC",name:'EHC'},
    {id:"IEEE SB",name:'IEEE SB'},
    {id:"Research Club",name:'Research Club'},
    {id:"Programming Club",name:'Programming Club'},
    {id:"Sambhav",name:'Sambhav'},
    {id:"Debate Club",name:'Debate Club'},
    {id:"Cultural Comm",name:'Cultural Comm'},
    {id:"DCEI",name:'DCEI'},
    {id:"Headrush",name:'Headrush'},
    {id:"MSTC",name:'MSTC'},
    {id:"Radio Club",name:'Radio Club'},
    {id:"Khelaiya Club",name:'Khelaiya Club'},
    {id:"SPC",name:'SPC'},
    {id:"CMC",name:'CMC'},
    {id:"HMC",name:'HMC'},
    {id:"Sports Comm",name:'Sports Comm'},
    {id:"ICT Comm",name:'ICT Comm'},
    {id:"Acad Comm",name:'Acad Comm'},
    {id:"Synapse Comm",name:'Synapse Comm'},
  ]

  const handleOnSelect=(selectedItemList)=>{
      setclubComm(selectedItemList);
  }
  
    const initial={
        name:"",
        username:"",
        gitHub:"",
        insta:"",
        linkedIn:"",
        bio:"",
    }

    const schema=yup.object().shape({
        name: yup
            .string()
            .required("Name is Required"),
        username: yup
            .string()
            .required("UserName is Required"),
        gitHub:yup
            .string(),
        insta:yup
            .string(),
        linkedIn:yup
            .string(),
        bio:yup
            .string()
        })


  const Profile_Form=(
    <ScrollView>
          <Card style={{flex:1 , margin:10}} >
             <Formik
                initialValues={initial}
                onSubmit={values => {
                  const obj={
                        name: values.name,
                        email,
                        username: values.username,
                        clubsNumber: clubComm.length,
                        bio: values.bio,
                        gitHubUrl: values.gitHub,
                        linkedInUrl: values.linkedIn,
                        instaUrl: values.insta,
                        tags: clubComm,
                  }
                  console.log(obj);

                  axios
                    .post(
                      `${API_URL}/adduser?` +
                        queryString.stringify({ email, googleToken }),obj)
                         .then(function (res) {
                            console.log(res.data);
                            if (res.data == 'username already taken') {
                              errors.username = 'username already taken';
                            }
                            if (res.data == 'success') {
                              Alert.alert("Data Added Successfully..");
                              setVisible(false);
                            };
                          })
                          .catch(function (error) {
                            console.log(error);
                          });
                  } 
                }
                validationSchema={schema}
            >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                <Fragment>
                    <TextInput
                        mode='outlined'
                        value={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={() => setFieldTouched('name')}
                        label="Name"
                        style={{marginTop:10,marginRight:10,marginLeft:10}}
                    />
                    {touched.name && errors.name &&
                    <HelperText type="error" style={{ fontSize: 10, color: 'red' }}>{errors.name}</HelperText>
                    }
                    <TextInput
                        mode='outlined'
                        value={values.username}
                        onChangeText={handleChange('username')}
                        label="UserName"
                        onBlur={() => setFieldTouched('username')}
                        style={{marginTop:10,marginRight:10,marginLeft:10}}
                    />
                    {touched.username && errors.username &&
                    <HelperText type="error" style={{ fontSize: 10, color: 'red' }}>{errors.username}</HelperText>
                    }
                    <MultiSelect
                      styleMainWrapper={{marginTop:10,marginRight:10,marginLeft:10 ,paddingHorizontal:10}}
                      
                      hideTags
                      items={tags}
                      uniqueKey="id"
                      onSelectedItemsChange={handleOnSelect}
                      selectedItems={clubComm}
                      selectText="Select Club/Committee"
                      searchInputPlaceholderText="Search Items..."
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
                      submitButtonColor="#CCC"
                      submitButtonText="Submit"
                    />
                    <View style={{flexWrap: 'wrap', justifyContent: 'space-evenly',flexDirection: 'row', paddingHorizontal: 10}}>
                    {clubComm.map((item,i )=> (
                      <View key={i} style={{borderWidth: 2, borderRadius: 10, padding: 5, margin: 2}}>
                        <Text key={i} style={{fontSize: 17}}>{item}</Text>
                      </View>
                    ))}
                  </View>
                    <TextInput
                        mode='outlined'
                        value={values.gitHub}
                        onChangeText={handleChange('gitHub')}
                        label="GitHub Profile Link"
                        onBlur={() => setFieldTouched('gitHub')}
                        style={{marginTop:10,marginRight:10,marginLeft:10}}
                    />
                     <TextInput
                        mode='outlined'
                        value={values.insta}
                        onChangeText={handleChange('insta')}
                        label="Instgram Profile Link"
                        onBlur={() => setFieldTouched('insta')}
                        style={{marginTop:10,marginRight:10,marginLeft:10}}
                    />
                    <TextInput
                        mode='outlined'
                        value={values.linkedIn}
                        onChangeText={handleChange('linkedIn')}
                        label="LinkedIn Profile Link"
                        onBlur={() => setFieldTouched('linkedIn')}
                        style={{marginTop:10,marginRight:10,marginLeft:10}}
                    />
                    <TextInput
                        mode='outlined'
                        value={values.bio}
                        onChangeText={handleChange('bio')}
                        label="Bio"
                        onBlur={() => setFieldTouched('bio')}
                        style={{marginTop:10,marginRight:10,marginLeft:10}}
                    />

                    <Button mode="contained" style={{margin:10,alignContent:'center'}} disabled={!isValid} onPress={handleSubmit}>Update Profile</Button>
                </Fragment>
                )}
            </Formik>
        </Card>
      </ScrollView>
  );

  // React.useEffect(() => {
  //  setUserDetails({
  //   "__v": 0,
  //   "_id": "5f7ebb01821afb0021a7fc34",
  //   "bio": "Hello All..",
  //   "clubsComm": [
  //     "DTG",
  //     "Radio Club",
  //   ],
  //   "clubsNumber": 2,
  //   "email": "201801190@daiict.ac.in",
  //   "gitHubUrl": "https://github.com/NeelMakadiya14",
  //   "instaUrl": "",
  //   "joined": "2020-10-08T07:08:49.037Z",
  //   "linkedInUrl": "",
  //   "name": "Neel Makadiya",
  //   "posts": [
  //     "5f82ee923151250021d1f0c1",
  //     "5f82fe183151250021d1f0c2",
  //     "5f8307dc3151250021d1f0c3",
  //     "5f83110d3151250021d1f0c4",
  //     "5f8317613151250021d1f0c5",
  //     "5f8335ce3151250021d1f0c6",
  //     "5f86c20959df5200214c9509",
  //     "5f86c4fd59df5200214c950a",
  //     "5f86c68559df5200214c950b",
  //     "5f86c81459df5200214c950c",
  //     "5f86d40159df5200214c950d",
  //   ],
  //   "username": "NeelMakadiya",
  // })
  // }, [])

 
  return (
    <SafeAreaView style={{ flex: 1 }}>
       <Provider>
        <Portal>
          <Modal visible={visible} >
            {Profile_Form}
          </Modal>
        </Portal>
        <SafeAreaView style={{flex:1 ,alignItems:'center',justifyContent:'center',margin:30}}>
          <View style={{flex:1,flexDirection:"row" ,alignItems:'center',justifyContent:'center'}}>
         {userDetails.email?
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
          />:<ActivityIndicator animating={true} />}
          </View>
          <Button
            style={{margin:10,justifyContent:'center',alignItems:'center'}}
            mode="outlined"
            icon="power"
            onPress={signOut}
          >Sign Out</Button>
        </SafeAreaView>
      </Provider>
    </SafeAreaView>
  );
});

import React ,{ useState, useEffect }from 'react';
import { View,SafeAreaView,Image,Alert,ActivityIndicator  } from 'react-native';
import { Text, Container } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from "../components/context";
import { Picker } from 'react-native-picker-dropdown';
import { Card,Button,TextInput,HelperText } from 'react-native-paper';
import axios from 'axios';
import queryString from "query-string";
import {API_URL,
Cloud,
Preset} from "@env";



export default (Profile = () => {

  const tags = ['Project', 'Artwork', 'Writings', 'Music', 'Dance', 'Other'];

  const { loginState } = React.useContext(AuthContext);
  
  console.log("MY Attr : ",Cloud,Preset);
  
  
  const email=loginState.user.email;
  const googleToken=loginState.userToken;
  const user_id=email.split("@")[0];

  const [IV, setImage] = useState(null);
//   const [ImageUrl, SetImageUrl] = useState('');
 // const [VideoUrl, SetVideoUrl] = useState('');
  const [loading,setLoad]=useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  // Code for Image/Video Picker
  const pickImage = async () => {
    let  result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });
  //  console.log(result);
    if (!result.cancelled) {
      setImage(result);
    }
  };

  const InitialValues = {
    title:"",
    description:"",
    tag:"Projects"
  };

  const [values, setValue] = useState(InitialValues);
  const [error, setError] = useState(true);

  
  const onSubmit = async () => {
    if (!error) {
      console.log(values);
      if(IV===null){
        Alert.alert("Please Select An Image");
      }
      else{
        setLoad(true);
        console.log(IV);
        var inx=IV.uri.lastIndexOf(".");
      let file = { 
                uri:IV.uri,
                type:`test/${IV.uri.slice(inx+1)}`,
                name:`test.${IV.uri.slice(inx+1)}` 
      }
      console.log("file : ",file);
        const data = new FormData()
        data.append('file',file)
        data.append('upload_preset',Preset)
        data.append("cloud_name",Cloud)
        data.append("folder","daconnect")

        fetch(`https://api.cloudinary.com/v1_1/${Cloud}/${IV.type}/upload/`,{
            method:"post",
            body:data,
        }).then(res=>res.json()).
        then(data=>{
        //    console.log("Yes..",data.url);
            console.log(data);
            let ImageUrl=null;
            let VideoUrl=null;
            if(IV.type==="image"){
              const arr1=data.url.split("/");
            ImageUrl=arr1[arr1.length-2]+"/"+arr1[arr1.length-1];
            }
            else{
             // console.log(data.url);
              const arr2=data.url.split("/");
           //   console.log(arr2);
            VideoUrl=arr2[arr2.length-2]+"/"+arr2[arr2.length-1];
          //  console.log(VideoUrl);
            }

          console.log("Url : ",VideoUrl,ImageUrl);  
          if (VideoUrl || ImageUrl) {
            console.log(email,googleToken,user_id,values.title,values.tag,values.description);
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
                      .then(function (res) {
                        setLoad(false);
                        if (res.data === 'successfully added post'){
                            Alert.alert("Post Uploaded Successfully.");
                            console.log("yessss...");
                        }
                        else{
                          console.log(res.data);
                        }
                          
                      })
                      .catch(function (error) {
                        console.log("Oh no! ",error);
                        setLoad(false);
                      });
                  }
            else{
                    Alert.alert("error while uploading.");
                    setLoad(false);
                  }
        }).catch(err=>{
            Alert.alert(err);
            setLoad(false);
        })



      }
        
                
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container style={{justifyContent:'center'}}>
      <Card elevation={2} style={{justifyContent:'center',marginLeft:20,marginRight:20,padding:5}}>
          <TextInput
          style={{marginTop:10,marginRight:10,marginLeft:10}}
          label="Title"
          value={values.title}
          onChangeText={(text)=>{setValue({...values ,title:text}); 
          if(text===""){
            setError(true)
            } 
            else{
              setError(false)
              }
              }
              }
          mode="outlined"
              />
            <HelperText type="error" visible={error}>Title can't be blank</HelperText>

          <TextInput
           style={{margin:10}}
          label="Discription"
          value={values.discription}
          onChangeText={(txt)=>{setValue({...values ,description:txt});}}
          mode="outlined"
          />

<Picker
 style={{marginLeft:10,marginRight:10,marginBottim:10,width:"40%"}}
          selectedValue={values.tag}
          onValueChange={(ItemValue,Index)=>{setValue({...values ,tag:ItemValue})}}
          mode="dialog"
         
        >
          <Picker.Item label={tags[0]} value={tags[0]} />
          <Picker.Item label={tags[1]} value={tags[1]} />
          <Picker.Item label={tags[2]} value={tags[2]} />
          <Picker.Item label={tags[3]} value={tags[3]} />
          <Picker.Item label={tags[4]} value={tags[4]} />
          <Picker.Item label={tags[5]} value={tags[5]} />
          
        </Picker>
       <Button icon={IV===null?"camera":"check-circle"} mode="Outlined" style={{padding:5,alignContent:'center'}} onPress={pickImage} >Select</Button>
       <Button mode="contained" loading={loading} style={{padding:2,margin:5,alignContent:'center'}} onPress={onSubmit}>Post</Button>
      </Card>
      </Container>
    </SafeAreaView>
  );
});

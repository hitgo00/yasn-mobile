import React,{useState,useEffect} from 'react';
import { View, SafeAreaView } from 'react-native';
import {  Container } from 'native-base';
import { Modal, Portal, Text, Button, Provider,TextInput,HelperText,Card } from 'react-native-paper';
import { AuthContext } from "../components/context";
import { useStoreState, useStoreActions } from 'easy-peasy';
import ChatApp from "../components/ChatApp";
import LoadingChat from "../components/LoadingChat";


export default (Profile = () => {
  const { authcontext,loginState } = React.useContext(AuthContext);
  const { SetNickname } = authcontext;

  const chat =useStoreState((states)=>states.chat);
  

  const [visible, setVisible] = React.useState(false);
  const [name,setName]=useState('');
  const [error,setError]=useState(true);

  const onSubmit=()=>{
    console.log(name);
    SetNickname(name);
    setVisible(false);
  }
console.log(loginState.nickname==="",loginState.nickname);

useEffect(()=>{
  setVisible(loginState.nickname===null);
},[]);

  const MyModal=(
     <Modal visible={visible} >
       <Card style={{margin:10}}>
          <Text style={{marginTop:10,marginRight:10,marginLeft:10}}>Start with what you want to be called</Text>
          <TextInput
          style={{marginTop:10,marginRight:10,marginLeft:10}}
          label="Enter Your Name Here."
          
          onChangeText={(text)=>{setName(text); 
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
            <HelperText type="error" visible={error}>Name can't be blank</HelperText>
            <Button mode="contained" style={{margin:10,alignContent:'center'}} onPress={onSubmit}>Set Name</Button>
            </Card>
        </Modal>
  );

  if(visible){
    return(
      <Provider>
      <Portal>
          {MyModal}
      </Portal>
      </Provider>
    );
  }

  return (
  
    <Provider>
      <Portal>
        {MyModal}
  <Text style={{marginTop:10,fontSize:30,textAlign:'center'}}>Chat App</Text>
  <Text style={{fontSize:15,textAlign:'center'}}>Power by Darkrai</Text>
        {chat?<ChatApp/>:<LoadingChat/>}
      </Portal>
    </Provider>
   
  );
});

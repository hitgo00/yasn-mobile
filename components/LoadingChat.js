import React, { useEffect, useCallback, useState } from 'react';
import {View,ActivityIndicator, Alert} from 'react-native';
import openSocket from 'socket.io-client';
import axios from 'axios';
import queryString from 'query-string';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { AuthContext } from "../components/context";
import { API_URL } from '@env';


export default function LoadingChat() {

    const {loginState } = React.useContext(AuthContext);
    const email=loginState.user.email;
    const googleToken=loginState.userToken;
    const url = 'Da-Connect';
    const [loading, setLoading] = useState(false);
    const { setChat, setMessageData, setSocket} = useStoreActions(
        (actions) => actions
    );

    const login = useCallback((username) => {
        let socket = openSocket(API_URL);

        if (socket) {
        setSocket(socket);
        socket.on('connection');
        socket.emit('add_user', {
            username,
            website: url,
        });

        axios
            .get(
            `${API_URL}/darkrai/login?` +
                queryString.stringify({ website: 'Da-Connect', googleToken, email })
            )
            .then((res) => {
               // console.log("From Loading : ",res);
                console.log(res.data);
                if(res.data==="invalid token"){
                    Alert.alert("Your Session is Expired","Please Login Again.");
                }
               const messages=res.data.map((value,id)=>{
                   let i=2;
                   if(value.username===loginState.nickname){
                        i=1;
                   }
                    return({
                        _id:value._id,
                        createdAt:value.date,
                        text:value.message,
                        user:{
                            _id:value.username,
                            name:value.username,
                            avatar:'https://placeimg.com/140/140/any'
                        }
                    });
               });
            setMessageData(messages);
            setChat(true);
            })
            .catch((err) => console.log('Error:\n', err));
        }

        
  });

  useEffect(() => {
    if (loginState.nickname !== null) {
      login(loginState.nickname);
    }
  }, [login, loginState.nickname, setChat, setMessageData, setSocket, url]);



    return (
       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    )
}

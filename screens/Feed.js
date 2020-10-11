import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";
import { StyleSheet, View, SafeAreaView, Alert } from "react-native";
import { Container, Text, Content, Header, Body } from "native-base";
import PostCard from "../components/PostCard";
import { AuthContext } from "../components/context";
import { API_URL } from "@env";


export default (Feed = () => {
  const [browseTag, SetBrowseTag] = useState("");
  const [posts, setPosts] = useState();

   const { loginState } = React.useContext(AuthContext);

  const email=loginState.user.email;
  const googleToken=loginState.userToken;

  console.log(API_URL);

  useEffect(() => {
    axios
      .get(
        `${API_URL}/home?` +
          queryString.stringify({ tag: browseTag ,email,googleToken}, { withCredentials: true })
      )
      .then((res) => {
        if(res.data!=="invalid token"){
          setPosts(res.data);
        }
        else{
          Alert.alert("Your Session is Expired","Please Login Again.");
        }
        
      })

      .catch((err) => console.log(err));
  }, []);
  console.log(posts);

  {
    /* <SafeAreaView style={{ flex: 1 }}>{<GoogleSignIn />}</SafeAreaView>; */
  }
  return (
    <Content>
      { posts
        ? posts.map((post) => <PostCard {...post} key={post._id} />)
        : null} 
    </Content>
  );
});

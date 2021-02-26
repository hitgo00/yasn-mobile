import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";
import { FlatList, ActivityIndicator } from "react-native";
import PostCard from "../components/PostCard/index";
import { AuthContext } from "../components/context";
import { useFocusEffect } from "@react-navigation/native";
const LIMIT = 14;

const image = {
  uri:
    "https://res.cloudinary.com/hitgo/image/upload/v1606861612/BackgroundS_wxglzf.jpg",
};
export default (Feed = () => {
  const [browseTag, SetBrowseTag] = useState("");
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [fetching, setFetching] = useState(false);
  const { loginState } = React.useContext(AuthContext);
  const [pageToFetch, setPageToFetch] = useState(1);

  const email = loginState.user.email;
  const googleToken = loginState.userToken;
  console.log("From Feed : ", loginState);
  const API_URL = "https://connectda.herokuapp.com";


  // useFocusEffect(
  //   React.useCallback(() => {
  //     axios
  //       .get(
  //         `${API_URL}/home?` +
  //           queryString.stringify(
  //             { tag: browseTag, email, googleToken },
  //             { withCredentials: true }
  //           )
  //       )
  //       .then((res) => {
  //         if (res.data !== "invalid token") {
  //           console.log("========Again=======");
  //           setPosts(res.data.posts);
  //         } else {
  //           Alert.alert("Your Session is Expired", "Please Login Again.");
  //         }
  //       })

  //       .catch((err) => console.log(err));
  //   }, [])
  // );

  useEffect(() => {
    let cancel;
    setFetching(true);
    axios
      .get(
        `${API_URL}/home?` +
          queryString.stringify(
            { limit: LIMIT, page: pageToFetch, googleToken, email },
            { withCredentials: true }
          ),
        { cancelToken: new axios.CancelToken((c) => (cancel = c)) }
      )
      .then((res) => {
        setPosts((prevPosts) => {
          return prevPosts.concat(res.data.posts);
        });
        if (Number(res.data.page) * LIMIT <= res.data.total) {
          setHasMore(true);
          console.log(Number(res.data.page) + 1);
        } else {
          setHasMore(false);
        }
        setFetching(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });

    return () => cancel();
  }, [email, googleToken, pageToFetch]);

  return (
    <>
      {posts.length ? (
        <FlatList
          style={{ paddingBottom: 70, backgroundColor: "#0B0C10" }}
          keyboardShouldPersistTaps="handled"
          data={posts}
          keyExtractor={(post) => post._id}
          renderItem={({ item: post }) => <PostCard {...post} key={post._id} />}
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd > 200 && hasMore) {
              setPageToFetch((pageToFetch) => pageToFetch + 1);
            }
          }}
        />
      ) : (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          size="large"
        />
      )}
    </>
  );
});

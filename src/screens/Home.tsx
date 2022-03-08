import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useState } from 'react';

import { SafeAreaView, Text, View, StyleSheet, FlatList } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Button, Title } from 'react-native-paper';
import FriendDataService from '../api/authenticated/friend/FriendDataService';
import PostDataService from '../api/authenticated/post/PostDataService';
import PostItem from '../components/PostItem';
import { useAuth } from '../context/AuthContext';
import checkNetwork from '../exceptions/CheckNetwork';
import { Post } from '../interfaces/Interfaces';
import { PostStackParams } from '../types/Types';

type PostScreenProp = StackNavigationProp<PostStackParams>;
function HomeScreen() {
  const navigation = useNavigation<PostScreenProp>();
  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    container: {
      flex: 1,
    },
  });

  const auth = useAuth();
  PostDataService.setAuth(auth.authData);
  FriendDataService.setAuth(auth.authData);
  const [posts, setPosts] = useState<[Post] | []>([]);
  const [friendPosts, setFriendPosts] = useState<[Post] | []>([]);
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused

      let friendPostArray = friendPosts;
      friendPostArray.length = 0;
      setFriendPosts(friendPostArray);
      friendPostArray = friendPosts;
      PostDataService.index(auth.authData?.id)
        .then((response: any) => {
          // set data
          setPosts(response.data);
        })
        .catch((err) => {
          checkNetwork(err.message);
        });
      const friendDataService = FriendDataService.getFriendList(
        auth.authData?.id
      )
        .then((response: any) => {
          const friendIds = response.data.map(
            (friend: object) => friend.user_id
          );
          friendIds.forEach((id: number) => {
            PostDataService.index(id)
              .then((response: any) => {
                response.data.map((post: object) => friendPostArray.push(post));

                setFriendPosts(friendPostArray);
              })
              .catch((err) => {
                checkNetwork(err.message);
              });
          });
        })
        .catch((err) => {
          checkNetwork(err.message);

          showMessage({
            message: 'Error contact the helpdesk!',
            type: 'danger',
            duration: 3000,
          });
        });

      return () => {
        setPosts([]);
        setFriendPosts([]);
      };
    }, [])
  );
  const seeFriendPost = () => {
    let allPosts = friendPosts;

    allPosts = allPosts.sort((a, b) => b.post_id - a.post_id);

    navigation.navigate('Friend Feed', { posts: allPosts });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title> Welcome to Spacebook</Title>

      <View style={styles.header}>
        <Button
          icon="post-outline"
          mode="outlined"
          onPress={() => navigation.navigate('Post')}
        >
          Create a post
        </Button>

        <Button icon="post-outline" onPress={seeFriendPost}>
          View Friend Posts
        </Button>
      </View>
      <Text>Here are your posts</Text>

      <FlatList
        data={posts}
        keyExtractor={(post) => `${post.post_id}`}
        renderItem={({ item }) => (
          <PostItem item={item} authData={auth.authData} />
        )}
        initialNumToRender={50}
      />
    </SafeAreaView>
  );
}
export default HomeScreen;

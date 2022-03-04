import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useState } from 'react';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Avatar, Button } from 'react-native-paper';
import PostDataService from '../api/authenticated/post/PostDataService';
import { useAuth } from '../context/AuthContext';
import checkNetwork from '../exceptions/CheckNetwork';
import { Post } from '../interfaces/Interfaces';
import { PostStackParams } from '../types/Types';

type PostUserScreenRouteProp = RouteProp<PostStackParams, 'User Post'>;

type UserPostScreenProp = StackNavigationProp<PostStackParams>;

function UserPost() {
  const navigation = useNavigation<UserPostScreenProp>();

  const route = useRoute<PostUserScreenRouteProp>();

  const auth = useAuth();
  PostDataService.setAuth(auth.authData);
  const [isOwner, setIsOwner] = useState<boolean>();

  const [post, setPost] = useState<Post>();
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      PostDataService.show(route.params.user_id, route.params.post_id)
        .then((response: any) => {
          // set data

          setPost(response.data);

          const isOwnerTemp =
            response.data.author.user_id === auth.authData?.id;

          setIsOwner(isOwnerTemp);
        })
        .catch((err) => {
          checkNetwork(err.message);
        });
      return () => {
        // setPosts(undefined);
      };
    }, [])
  );
  PostDataService.setAuth(auth.authData);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  const editPost = () => {
    console.log('sas');
  };
  const deletePost = () => {
    // Do something when the screen is focused
    PostDataService.delete(post.author.user_id, post.post_id)
      .then((response: any) => {
        navigation.navigate('Home Feed');
        showMessage({
          message: 'Post was successfully deleted.',
          type: 'success',
          duration: 5000,
        });
      })
      .catch((err) => {
        checkNetwork(err.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TODO: USE POST COMPONENET */}
      {post && (
        <>
          <View>
            <Avatar.Text size={24} label={post.author.first_name} />
            <Text> </Text>
            <Text>{post.author.first_name}</Text>
            <Text> </Text>
            <Text>{post.author.last_name}</Text>
          </View>
          <View>
            <Text> </Text>
            <Text>{post.text}</Text>
          </View>

          <View>
            <Text> </Text>
            <Text>{new Date(Date.parse(post.timestamp)).toUTCString()}</Text>
            <Text> </Text>
          </View>

          {isOwner && (
            <View>
              <Button mode="outlined" onPress={editPost}>
                Edit
              </Button>

              <Button mode="outlined" onPress={deletePost}>
                Delete
              </Button>
            </View>
          )}
          {/* Like componenet created here */}
          {/* <TouchableOpacity onPress={likePost}>
            <View style={styles.container}>
              <Text>{likeCount}</Text>

              <Text> </Text>
              <Avatar.Icon icon="thumb-up" size={18} color="#fff" />
            </View>
          </TouchableOpacity> */}
        </>
      )}
    </SafeAreaView>
  );
}

export default UserPost;

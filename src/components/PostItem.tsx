import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Avatar, Text } from 'react-native-paper';
import PostDataService from '../api/authenticated/post/PostDataService';
import checkNetwork from '../exceptions/CheckNetwork';
import { Post } from '../interfaces/Interfaces';
import { PostStackParams } from '../types/Types';

type PostItemProp = {
  item: Post;
  authData: any | undefined;
};

type PostScreenProp = StackNavigationProp<PostStackParams>;

export default function PostItem(props: PostItemProp) {
  const navigation = useNavigation<PostScreenProp>();

  const { item, authData } = props;

  const [likeCount, setLikeCount] = useState<number>(item.numLikes);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      flex: 1,
    },
    post: {
      backgroundColor: '#c4e0ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      flex: 1,
    },
    holder: {
      flex: 1,
    },
  });

  const humanDate = new Date(Date.parse(item.timestamp));

  PostDataService.setAuth(authData);
  const likePost = () => {
    if (authData.id === item.author.user_id) {
      showMessage({
        message: 'You cannot like your own post!',
        type: 'warning',
        duration: 3000,
      });

      return;
    }

    PostDataService.like(item.author.user_id, item.post_id)
      .then(() => {
        // set data
        const newLikeCount = likeCount + 1;
        setLikeCount(newLikeCount);
      })
      .catch((err) => {
        if (err.response.status) {
          PostDataService.unLike(item.author.user_id, item.post_id).then(() => {
            // set data
            const newLikeCount = likeCount - 1;
            setLikeCount(newLikeCount);
          });
        }
        checkNetwork(err.message);
      });
  };

  const viewPost = () => {
    navigation.push('User Post', {
      post_id: item.post_id,
      user_id: item.author.user_id,
    });
  };
  return (
    <TouchableOpacity onPress={viewPost}>
      <View style={styles.post}>
        <View style={styles.container}>
          <Avatar.Text size={24} label={item.author.first_name} />
          <Text> </Text>
          <Text>{item.author.first_name}</Text>
          <Text> </Text>
          <Text>{item.author.last_name}</Text>
        </View>
        <View style={styles.holder}>
          <Text> </Text>
          <Text>{item.text}</Text>
        </View>
        <View style={styles.holder}>
          <Text> </Text>
          <Text>{humanDate.toUTCString()}</Text>
          <Text> </Text>
        </View>

        <TouchableOpacity onPress={likePost}>
          <View style={styles.container}>
            <Text>{likeCount}</Text>

            <Text> </Text>
            <Avatar.Icon icon="thumb-up" size={18} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

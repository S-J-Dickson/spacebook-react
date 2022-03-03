import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useState } from 'react';

import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';
import { Button, Title } from 'react-native-paper';
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
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });
  const auth = useAuth();
  PostDataService.setAuth(auth.authData);

  const [posts, setPosts] = useState<[Post] | undefined>();

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      PostDataService.index(auth.authData?.id)
        .then((response: any) => {
          // set data
          setPosts(response.data);

          console.log(response.data);
        })
        .catch((err) => {
          checkNetwork(err.message);
        });
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  return (
    <SafeAreaView>
      <Title> Welcome to Spacebook</Title>

      <View style={styles.container}>
        <Text> Whats on your mind?</Text>
        <Button
          icon="post-outline"
          mode="outlined"
          onPress={() => navigation.navigate('Post')}
        >
          Create a post
        </Button>
      </View>

      <View>
        <FlatList
          data={posts}
          keyExtractor={(post) => `${post.post_id}`}
          renderItem={PostItem}
        />
      </View>
    </SafeAreaView>
  );
}
export default HomeScreen;

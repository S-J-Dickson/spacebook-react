import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useState } from 'react';

import { SafeAreaView, Text, View, StyleSheet, FlatList } from 'react-native';
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

  const [posts, setPosts] = useState<[Post] | undefined>();

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      PostDataService.index(auth.authData?.id)
        .then((response: any) => {
          // set data
          setPosts(response.data);
        })
        .catch((err) => {
          checkNetwork(err.message);
        });
      return () => {
        setPosts(undefined);
      };
    }, [])
  );
  return (
    <SafeAreaView style={styles.container}>
      <Title> Welcome to Spacebook</Title>

      <View style={styles.header}>
        <Text> Whats on your mind?</Text>
        <Button
          icon="post-outline"
          mode="outlined"
          onPress={() => navigation.navigate('Post')}
        >
          Create a post
        </Button>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(post) => `${post.post_id}`}
        renderItem={({ item }) => (
          <PostItem item={item} authData={auth.authData} />
        )}
      />
    </SafeAreaView>
  );
}
export default HomeScreen;

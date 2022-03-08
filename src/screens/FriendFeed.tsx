import { useRoute } from '@react-navigation/native';
import React from 'react';

import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import PostItem from '../components/PostItem';
import { useAuth } from '../context/AuthContext';
import { FriendFeedScreenRouteProp } from '../types/Types';

function FriendFeed() {
  const route = useRoute<FriendFeedScreenRouteProp>();
  const auth = useAuth();

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    container: {
      flex: 1,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={route.params.posts}
        keyExtractor={(post) => `${post.post_id}`}
        renderItem={({ item }) => (
          <PostItem item={item} authData={auth.authData} />
        )}
        initialNumToRender={50}
      />
    </SafeAreaView>
  );
}
export default FriendFeed;

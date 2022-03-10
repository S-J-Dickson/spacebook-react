import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';

import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import PostDraftItem from '../components/PostDraftItem';
import { DraftPost } from '../interfaces/Interfaces';
import { DraftScreenProp } from '../types/Types';

function PostDraft() {
  const [draftPost, setDraftPost] = useState<[DraftPost]>();

  const navigation = useNavigation<DraftScreenProp>();

  useFocusEffect(
    useCallback(
      () => {
        // Do something when the screen is focused
        const fetchDraft = async () => {
          const postsFromStorage = await AsyncStorage.getItem('@Posts');
          const data = JSON.parse(postsFromStorage);
          setDraftPost(data);
        };
        fetchDraft();
      },
      () => {
        setDraftPost(undefined);
      },
      []
    )
  );
  const updateDraftPost = (updatedDraftPost: undefined | [DraftPost]) => {
    setDraftPost(updatedDraftPost);
  };

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
      <Title>Viewing draft posts</Title>
      <FlatList
        data={draftPost}
        keyExtractor={(post) => `${post.draft_id}`}
        renderItem={({ item }) => (
          <PostDraftItem item={item} updateDraftPost={updateDraftPost} />
        )}
        initialNumToRender={50}
      />
    </SafeAreaView>
  );
}

export default PostDraft;

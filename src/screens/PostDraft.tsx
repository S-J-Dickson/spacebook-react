import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';

import { FlatList, SafeAreaView, View } from 'react-native';
import { Text, Title } from 'react-native-paper';

function PostDraft() {
  const [draftPost, setDraftPost] = useState();

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

  return (
    <SafeAreaView>
      <Title>Viewing draft posts</Title>

      <FlatList
        data={draftPost}
        renderItem={({ item }) => <Text>{item.text}</Text>}
      />
    </SafeAreaView>
  );
}

export default PostDraft;

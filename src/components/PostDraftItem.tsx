import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ContinousBaseGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';
import { Button, Text } from 'react-native-paper';
import { DraftPost } from '../interfaces/Interfaces';
import { PostStackParams } from '../types/Types';

type PostDraftItemProp = {
  item: DraftPost;
  updateDraftPost: ([]) => {};
};

type DraftScreenProp = StackNavigationProp<PostStackParams>;

export default function PostDraftItem(props: PostDraftItemProp) {
  const navigation = useNavigation<DraftScreenProp>();

  const { item, updateDraftPost } = props;
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

  const editDraft = () => {};

  const deleteDraft = async () => {
    const postsFromStorage = await AsyncStorage.getItem('@Posts');
    const data = JSON.parse(postsFromStorage);

    const updatedPost = data.filter(
      (x: DraftPost) => x.draft_id !== item.draft_id
    );

    updateDraftPost(updatedPost);

    AsyncStorage.setItem('@Posts', JSON.stringify(updatedPost));
  };

  return (
    <TouchableOpacity onPress={editDraft}>
      <View style={styles.post}>
        <View style={styles.holder}>
          <Text>{item.text}</Text>
        </View>
        <Button onPress={deleteDraft} icon="delete-outline">
          Delete
        </Button>
      </View>
    </TouchableOpacity>
  );
}

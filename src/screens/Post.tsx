import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { SafeAreaView, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Button, Switch, Text, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import DatePicker from 'react-native-date-picker';
import PostDataService from '../api/authenticated/post/PostDataService';
import FormInput from '../components/FormInput';
import { useAuth } from '../context/AuthContext';
import checkNetwork from '../exceptions/CheckNetwork';
import {
  DraftPost,
  PostRequest as PostInterface,
} from '../interfaces/Interfaces';
import { PostStackParams } from '../types/Types';

type PostScreenProp = StackNavigationProp<PostStackParams>;
type PostScreenRouteProp = RouteProp<PostStackParams, 'Post'>;

function Post() {
  const route = useRoute<PostScreenRouteProp>();

  const [isEditing, setIsEditing] = useState(false);

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const minimumDate = new Date(Date.now());

  const [date, setDate] = useState(new Date());

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      if (route?.params?.draft_post !== undefined) {
        setIsEditing(true);

        if (route?.params?.draft_post.is_scheduled) {
          setDate(new Date(route?.params?.draft_post.time_to_post));
        }
        setIsSwitchOn(route?.params?.draft_post.is_scheduled);
      }

      return () => {
        setIsEditing(false);
        setIsSwitchOn(false);
      };
    }, [])
  );

  const defaultValues: PostInterface = {
    text: route?.params?.draft_post?.text,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const ERROR_MESSAGES = {
    REQUIRED: 'This field is required',
  };

  const auth = useAuth();

  const navigation = useNavigation<PostScreenProp>();
  PostDataService.setAuth(auth.authData);

  const onSubmit = async (postRequest: PostInterface) => {
    PostDataService.store(auth.authData?.id, postRequest)
      .then(async () => {
        showMessage({
          message: 'Post has been created!',
          type: 'success',
          duration: 3000,
        });

        if (isEditing) {
          const postsFromStorage = await AsyncStorage.getItem('@Posts');
          const data = JSON.parse(postsFromStorage);

          const updatedPosts = data.filter(
            (x: DraftPost) => x.draft_id !== route.params.draft_post.draft_id
          );
          AsyncStorage.setItem('@Posts', JSON.stringify(updatedPosts));
        }

        navigation.navigate('Home Feed');
      })
      .catch((err) => {
        checkNetwork(err.message);
      });
  };

  const schedulePost = async (postRequest: PostInterface) => {
    const postsFromStorage = await AsyncStorage.getItem('@Posts');
    const data = JSON.parse(postsFromStorage);

    let allPosts;

    if (isEditing) {
      const draftPost: DraftPost = {
        draft_id: route.params.draft_post?.draft_id,
        text: postRequest.text,
        is_scheduled: true,
        time_to_post: date,
      };
      // Remove post that is being updated
      const updatedPost = data.filter(
        (x: DraftPost) => x.draft_id !== draftPost.draft_id
      );

      allPosts = [draftPost].concat(updatedPost);
    } else {
      const draftPost: DraftPost = {
        draft_id: uuid.v4(),
        text: postRequest.text,
        is_scheduled: true,
        time_to_post: date,
      };

      allPosts = [draftPost].concat(data);
    }

    AsyncStorage.setItem('@Posts', JSON.stringify(allPosts));

    showMessage({
      message: 'Post has been scheduled!',
      type: 'success',
      duration: 3000,
    });

    navigation.navigate('Home Feed');
  };

  const createDraft = async (postRequest: PostInterface) => {
    const draftPost: DraftPost = {
      draft_id: uuid.v4(),
      text: postRequest.text,
      is_scheduled: false,
      time_to_post: undefined,
    };

    const postsFromStorage = await AsyncStorage.getItem('@Posts');
    const data = JSON.parse(postsFromStorage);

    let allPosts = [draftPost].concat(data);
    allPosts = allPosts.filter((el) => el != null);

    AsyncStorage.setItem('@Posts', JSON.stringify(allPosts));

    showMessage({
      message: 'Post draft has been created!',
      type: 'success',
      duration: 3000,
    });

    navigation.navigate('Home Feed');
  };

  const updateDraft = async (postRequest: PostInterface) => {
    const draftPost: DraftPost = {
      draft_id: route.params.draft_post?.draft_id,
      text: postRequest.text,
      is_scheduled: false,
      time_to_post: undefined,
    };

    const postsFromStorage = await AsyncStorage.getItem('@Posts');
    const data = JSON.parse(postsFromStorage);

    // Remove post that is being updated
    const updatedPost = data.filter(
      (x: DraftPost) => x.draft_id !== draftPost.draft_id
    );

    const allPosts = [draftPost].concat(updatedPost);

    AsyncStorage.setItem('@Posts', JSON.stringify(allPosts));

    showMessage({
      message: 'Post draft has been updated!',
      type: 'success',
      duration: 3000,
    });

    navigation.navigate('Home Feed');
  };
  return (
    <SafeAreaView>
      {!isEditing && <Title>Creating a post</Title>}
      {isEditing && <Title>Editing a draft post</Title>}

      <FormInput
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
          maxLength: 100,
        }}
        control={control}
        name="text"
        placeHolder="Text"
        errorMessage={errors.text?.message}
        error={errors.text}
        isSecureTextEntry={false}
      />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <Text>Schedule the post?</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>

      {isSwitchOn && (
        <DatePicker
          minimumDate={minimumDate}
          date={date}
          onDateChange={setDate}
        />
      )}

      {!isEditing && !isSwitchOn && (
        <Button
          icon="post-outline"
          mode="outlined"
          onPress={() => {
            navigation.push('Post Draft');
          }}
        >
          View Drafts
        </Button>
      )}

      {!isEditing && !isSwitchOn && (
        <Button
          icon="post-outline"
          mode="outlined"
          onPress={handleSubmit(createDraft)}
        >
          Create Draft
        </Button>
      )}
      {isEditing && !isSwitchOn && (
        <Button
          icon="post-outline"
          mode="outlined"
          onPress={handleSubmit(updateDraft)}
        >
          Update Draft
        </Button>
      )}

      {!isSwitchOn && (
        <Button
          icon="post-outline"
          mode="outlined"
          onPress={handleSubmit(onSubmit)}
        >
          Submit Post
        </Button>
      )}

      {isSwitchOn && (
        <Button
          icon="post-outline"
          mode="outlined"
          onPress={handleSubmit(schedulePost)}
        >
          Schedule Post
        </Button>
      )}
    </SafeAreaView>
  );
}

export default Post;

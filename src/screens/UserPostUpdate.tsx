/* eslint-disable @typescript-eslint/comma-dangle */
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { useForm } from 'react-hook-form';

import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Button } from 'react-native-paper';
import PostDataService from '../api/authenticated/post/PostDataService';
import FormInput from '../components/FormInput';
import checkNetwork from '../exceptions/CheckNetwork';
import { PostUserScreenRouteProp, UserPostScreenProp } from '../types/Types';

import { PostRequest as PostInterface } from '../interfaces/Interfaces';
import { useAuth } from '../context/AuthContext';

function UserPostUpdate() {
  const navigation = useNavigation<UserPostScreenProp>();

  const route = useRoute<PostUserScreenRouteProp>();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  const defaultValues: PostInterface = {
    text: route.params.text,
  };

  const auth = useAuth();

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
  PostDataService.setAuth(auth.authData);

  const onSubmit = (postRequest: PostInterface) => {
    PostDataService.update(
      route.params.user_id,
      route.params.post_id,
      postRequest
    )
      .then(() => {
        showMessage({
          message: 'Post has been updated!',
          type: 'success',
          duration: 3000,
        });

        // const postId = route.params.post_id;
        // const userId = route.params.user_id;
        navigation.goBack();
      })
      .catch((err: any) => {
        checkNetwork(err.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Editing user</Text>

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

      <Button
        icon="post-outline"
        mode="outlined"
        onPress={handleSubmit(onSubmit)}
      >
        Update Post
      </Button>
    </SafeAreaView>
  );
}

export default UserPostUpdate;

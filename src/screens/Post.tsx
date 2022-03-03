import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { useForm } from 'react-hook-form';

import { SafeAreaView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Button, Title } from 'react-native-paper';
import PostDataService from '../api/authenticated/post/PostDataService';
import FormInput from '../components/FormInput';
import { useAuth } from '../context/AuthContext';
import checkNetwork from '../exceptions/CheckNetwork';
import { Post as PostInterface } from '../interfaces/Interfaces';
import { PostStackParams } from '../types/Types';

type HomeScreenProp = StackNavigationProp<PostStackParams>;

function Post() {
  const defaultValues: PostInterface = {
    text: '',
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

  const navigation = useNavigation<HomeScreenProp>();

  PostDataService.setAuth(auth.authData);

  const onSubmit = (postRequest: PostInterface) => {
    PostDataService.store(auth.authData?.id, postRequest)
      .then(() => {
        showMessage({
          message: 'Post has been created!',
          type: 'success',
          duration: 3000,
        });
        navigation.navigate('Home Feed');
      })
      .catch((err) => {
        checkNetwork(err.message);
      });
  };
  return (
    <SafeAreaView>
      <Title>Creating a post</Title>

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
        Submit Post
      </Button>
    </SafeAreaView>
  );
}

export default Post;

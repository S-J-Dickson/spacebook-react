import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { useForm } from 'react-hook-form';

import { SafeAreaView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import UserDataService from '../api/authenticated/user/UserDataService';
import FormInput from '../components/FormInput';
import { useAuth } from '../context/AuthContext';
import checkNetwork from '../exceptions/CheckNetwork';
import {
  UserUpdate as UserUpdateInterface,
  UserRequest,
} from '../interfaces/Interfaces';
import { SettingStackParams } from '../types/Types';

type SettingScreenProp = StackNavigationProp<SettingStackParams, 'Setting'>;

function UserUpdate() {
  const navigation = useNavigation<SettingScreenProp>();

  const auth = useAuth();
  const defaultValues: UserRequest = {
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    password_repeat: '',
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
    EMAIL_INVALID: 'Not a valid email',
    PASSWORD_INVALID: 'Password needs to be 6 characters or larger',
  };

  UserDataService.setAuth(auth.authData);
  const { user } = auth;

  const onSubmit = (userRequest: UserRequest) => {
    const updateUser: UserUpdateInterface = {
      first_name: userRequest.first_name,
      last_name: userRequest.last_name,
      email: userRequest.email,
      password: userRequest.password,
    };

    UserDataService.updateUser(updateUser, auth.authData?.id)
      .then(() => {
        showMessage({
          message: 'Your details have been updated!',
          type: 'success',
          duration: 3000,
        });

        navigation.navigate('Settings');
      })
      .catch((err) => {
        checkNetwork(err.message);

        if (err.response?.status === 400) {
          showMessage({
            message: err.message,
            type: 'danger',
            duration: 3000,
          });
        }
      });
  };

  return (
    <SafeAreaView>
      <TextInput value={user.email} />

      <FormInput
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
          maxLength: 100,
        }}
        control={control}
        name="first_name"
        placeHolder="First Name"
        errorMessage={errors.first_name?.message}
        error={errors.first_name}
        isSecureTextEntry={false}
        value={user.first_name}
      />
      <FormInput
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
        }}
        control={control}
        name="last_name"
        placeHolder="Last Name"
        errorMessage={errors.last_name?.message}
        error={errors.last_name}
        isSecureTextEntry={false}
        value={user.last_name}
      />

      <FormInput
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
          maxLength: 80,
          pattern: {
            message: ERROR_MESSAGES.EMAIL_INVALID,
            value:
              /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,
          },
        }}
        control={control}
        name="email"
        placeHolder="Email"
        errorMessage={errors.email?.message}
        error={errors.email}
        isSecureTextEntry={false}
        value={user.email}
      />

      <FormInput
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
          minLength: {
            value: 6,
            message: ERROR_MESSAGES.PASSWORD_INVALID,
          },
        }}
        control={control}
        name="password"
        placeHolder="Password"
        errorMessage={errors.password?.message}
        error={errors.password}
        isSecureTextEntry
        value=""
      />

      <Button mode="outlined" onPress={handleSubmit(onSubmit)}>
        Update Details
      </Button>
    </SafeAreaView>
  );
}

export default UserUpdate;

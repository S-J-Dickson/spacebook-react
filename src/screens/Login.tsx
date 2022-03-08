/* eslint-disable no-useless-escape */
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { SafeAreaView, View } from 'react-native';

import { useForm } from 'react-hook-form';
import { Button, Title } from 'react-native-paper';
import { LoginUser, RegisterScreenProp } from '../types/Types';
import { useAuth } from '../context/AuthContext';
import FormInput from '../components/FormInput';
import { UserRequest } from '../interfaces/Interfaces';

function LoginScreen() {
  const navigation = useNavigation<RegisterScreenProp>();

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
    PASSWORD_INVALID: 'Password needs to be 5 characters or larger',
  };

  const onSubmit = (userRequest: UserRequest) => {
    const loginUser: LoginUser = {
      email: userRequest.email,
      password: userRequest.password,
    };
    auth.signIn(loginUser);
  };

  return (
    <SafeAreaView>
      <View>
        <View>
          <Title> Welcome to SPACEBOOK</Title>
        </View>

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
        />

        <FormInput
          rules={{
            required: { value: true, message: ERROR_MESSAGES.REQUIRED },
            minLength: {
              value: 5,
              message: ERROR_MESSAGES.PASSWORD_INVALID,
            },
          }}
          control={control}
          name="password"
          placeHolder="Password"
          errorMessage={errors.password?.message}
          error={errors.password}
          isSecureTextEntry
        />

        <Button mode="outlined" onPress={handleSubmit(onSubmit)}>
          Login
        </Button>

        <Button mode="outlined" onPress={() => navigation.navigate('Register')}>
          Register
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;

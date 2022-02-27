/* eslint-disable react/jsx-one-expression-per-line */
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import { SafeAreaView, useColorScheme, StyleSheet } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useForm, Controller } from 'react-hook-form';
import { HelperText, TextInput, Title, Button } from 'react-native-paper';

import { RootStackParams } from '../types/Types';
import { UserRequest } from '../interfaces/Interfaces';
import RegistrationDataService from '../api/RegistrationDataService';
import FormInput from '../components/FormInput';

type LoginScreenProp = StackNavigationProp<RootStackParams, 'Login'>;

const styles = StyleSheet.create({
  input: {
    marginVertical: 2,
    height: 35,
  },
});

function RegisterScreen() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const defaultValues: UserRequest = {
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    password_repeat: '',
  };

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  defaultValues.password = watch('password', '');

  const ERROR_MESSAGES = {
    REQUIRED: 'This field is required',
    EMAIL_INVALID: 'Not a valid email',
    PASSWORD_INVALID: 'Password needs to be 5 characters or larger',
  };

  const navigation = useNavigation<LoginScreenProp>();

  const onSubmit = (userRequest: UserRequest) => {
    RegistrationDataService.createAccount(userRequest, navigation);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Title>Sign Up</Title>

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
      <Controller
        control={control}
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
          min: {
            value: 5,
            message: ERROR_MESSAGES.PASSWORD_INVALID,
          },
          validate: (value: string) =>
            value === defaultValues.password || 'The passwords do not match',
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            secureTextEntry
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            placeholder="Repeat Password"
          />
        )}
        name="password_repeat"
      />
      {errors.password_repeat && (
        <HelperText type="error">{errors.password_repeat?.message} </HelperText>
      )}

      <Button mode="outlined" onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </SafeAreaView>
  );
}

export default RegisterScreen;

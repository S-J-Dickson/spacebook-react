/* eslint-disable react/jsx-one-expression-per-line */
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import { SafeAreaView, useColorScheme, StyleSheet } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useForm, Controller } from 'react-hook-form';
import { HelperText, TextInput, Title, Button } from 'react-native-paper';

import { RootStackParams } from '../types/Navigation';
import { UserRequest } from '../interfaces/Interfaces';
import RegistrationDataService from '../api/RegistrationDataService';

type PhotoScreenProp = StackNavigationProp<RootStackParams, 'Photo'>;

const styles = StyleSheet.create({
  input: {
    marginVertical: 5,
  },
  errorText: { color: 'red' },
});

function RegisterScreen() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const navigation = useNavigation<PhotoScreenProp>();

  const defaultValues: UserRequest = {
    first_name: '',
    last_name: '',
    password: '',
    email: '',
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
    console.log(userRequest);
    RegistrationDataService.createAccount(userRequest);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Title>Sign Up</Title>
      <Controller
        control={control}
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            placeholder="First Name"
          />
        )}
        name="first_name"
      />
      {errors.first_name && (
        <HelperText type="error"> {errors.first_name?.message} </HelperText>
      )}
      <Controller
        control={control}
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            placeholder="Last Name"
          />
        )}
        name="last_name"
      />
      {errors.last_name && (
        <HelperText type="error"> {errors.last_name?.message} </HelperText>
      )}
      <Controller
        control={control}
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
          maxLength: 80,
          pattern: {
            message: ERROR_MESSAGES.EMAIL_INVALID,
            value:
              /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            placeholder="Email"
          />
        )}
        name="email"
      />
      {errors.email && (
        <HelperText type="error"> {errors.email?.message} </HelperText>
      )}
      <Controller
        control={control}
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
          min: {
            value: 5,
            message: ERROR_MESSAGES.PASSWORD_INVALID,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            placeholder="Password"
          />
        )}
        name="password"
      />
      {errors.password && (
        <HelperText type="error"> {errors.password?.message} </HelperText>
      )}
      <Button mode="outlined" onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
      <Button onPress={() => navigation.navigate('Photo')}> Photo</Button>
    </SafeAreaView>
  );
}

export default RegisterScreen;

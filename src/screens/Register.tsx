/* eslint-disable react/jsx-one-expression-per-line */
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import { SafeAreaView, useColorScheme, StyleSheet } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useForm, Controller } from 'react-hook-form';
import { HelperText, TextInput, Title, Button } from 'react-native-paper';
import { RootStackParams } from '../types/Navigation';

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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const ERROR_MESSAGES = {
    REQUIRED: 'This field is required',
    NAME_INVALID: 'Not a Valid Name',
    EMAIL_INVALID: 'Not a valid email',
  };
  interface UserRequest {
    firstName: string;
    email: string;
    lastName: string;
    password: string;
  }

  const onSubmit = (userRequest: UserRequest) => {
    console.log('doing something');
    console.log(userRequest);
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
        name="firstName"
      />

      {errors.firstName && (
        <HelperText type="error"> {errors.firstName?.message} </HelperText>
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
        name="lastName"
      />

      {errors.lastName && (
        <HelperText type="error"> {errors.lastName?.message} </HelperText>
      )}

      <Controller
        control={control}
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
          maxLength: 80,
          pattern: {
            message: ERROR_MESSAGES.EMAIL_INVALID,
            value: /^\S+@\S+$/i,
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
            message: 'Password needs to be 5 characters or larger',
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
